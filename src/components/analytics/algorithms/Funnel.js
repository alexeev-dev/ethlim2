import React, {Component} from 'react'

import style from './styles/Funnel.module.scss'

import {FunnelStat} from 'components/analytics'

import {dataNames, emptyTitles} from './const'

class Funnel extends Component {
  render() {
    const {selected, target} = this.props.popup

    if (selected === 0 && typeof target === 'string') {
      return (
        <div className={style.funnel}>
          <div className={style.body}>
            <p className={style.emptyText}>Select {emptyTitles[target]}.</p>
          </div>
        </div>
      )
    }

    const attributes = this.props.popup.metrics
    const data = dataNames.reduce((result, item) => {
      result[item[0]] = typeof attributes[item[0]] === 'string'
        ? attributes[item[0]]
        : attributes[item[0]] === null
          ? 0
          : attributes[item[0]].toFixed(item[1])
      return result
    }, {})
    const rejValueShift = Math.min(Math.max(23, data.click_unique_prct), 85)
    const leadsWidth = Math.max(40, data.leads_prct / data.click_unique_prct * 100)
    const salesWidth = Math.max(17, data.approved_per_click_offer_prct / leadsWidth * 100)
    const roiProgressWidth = Math.min(100, Math.max(40, (data.ROI)))
    const roiValueShift = Math.min(806, 826 * roiProgressWidth / 100 - 4)
    const roiValue = typeof data.ROI === 'string' ? data.ROI : data.ROI.toFixed(0)

    return (
      <div className={style.funnel}>
        <div className={style.body}>
          <FunnelStat selected={selected} label="click" value={`${data.CPC} rub`}>
            <div className={style.cost}>
              <div className={style.barCost}>
                <div className={style.progressCost}>
                  <ul className={style.progressStats}>
                    <li className={style.progressStat}>spent: {data.cost} <small className={style.small}>rub</small></li>
                    <li className={style.progressStat}>{data.clicks} click</li>
                  </ul>
                </div>
              </div>
              <span
                className={style.valueCost}
              >100%</span>
            </div>
          </FunnelStat>
          <FunnelStat selected={selected} label="conversion" value={`${data.click_unique_cost} rub`}>
            <div className={style.conversion}>
              <div className={style.barConv}>
                <div
                  className={style.progressRej}
                  style={{width: `${data.bounces_prct}%`}}
                >Bounces</div>
                <div
                  className={style.progressConv}
                  style={{width: `${data.click_unique_prct}%`}}
                >Conversions</div>
              </div>
              <span className={style.valueConv}>{data.click_unique_prct}%</span>
              <span
                className={style.valueRej}
                style={{right: `${rejValueShift}%`}}
              >{data.bounces_prct}%</span>
            </div>
          </FunnelStat>
          <FunnelStat selected={selected} title="Leeds" label="lead" value={`${data.leads_cost} rub`}>
            <div
              className={style.lead}
              style={{width: `calc(${data.click_unique_prct}% - 170px * ${data.click_unique_prct} / 100)`}}
            >
              <div className={style.barLead}>
                <div className={style.progressLeadsConv}>{data.leads_count_per_click_unique}%</div>
                <div
                  className={style.progressLeads}
                  style={{width: `${leadsWidth}%`}}
                ></div>
              </div>
              <span className={style.valueLeads}>{data.leads_prct}%</span>
            </div>
          </FunnelStat>
          <FunnelStat selected={selected} label="sellings" value={`${data.approved_cost} rus`}>
            <div
              className={style.sale}
              style={{width: `calc(${data.click_unique_prct}% - 170px * ${data.click_unique_prct} / 100)`}}
            >
              <div className={style.barSale}>
                <div
                  className={style.progressSale}
                  style={{width: `${salesWidth}%`}}
                ></div>
              </div>
              <span className={style.valueSale}>{data.approved_per_click_offer_prct}%</span>
            </div>
          </FunnelStat>
        </div>
        <div className={style.footer}>
          <FunnelStat selected={selected} label="ROI" value={`${roiValue}%`} strong={true} color={data.ROI > 0 ? 'green' : 'red'}>
            <div className={style.roi}>
              <div className={style.barRoi}>
                <div
                  className={`${style.progressRoi} ${data.ROI > 0 ? style.green : ''}`}
                  style={{width: `${roiProgressWidth}%`}}
                >
                  <ul className={style.progressStats}>
                    <li className={style.progressStat}>earnings: {data.approved_sum} <small className={style.small}>rub</small></li>
                    <li className={style.progressStat}>{data.approved_unique} sellings</li>
                  </ul>
                </div>
              </div>
              <span
                className={`${style.valueRoi} ${data.ROI > 0 ? style.green : ''}`}
                style={{
                  left: `calc(${roiValueShift}px)`
                }}
              >{data.ROI}%</span>
            </div>
          </FunnelStat>
        </div>
      </div>
    )
  }
}

export default Funnel
