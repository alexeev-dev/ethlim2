import React, {Component, Fragment} from 'react'

import {ChartItem} from 'components/analytics'
import {Icon} from 'components/utility'

import {calcRoiAdjustment, calcLeadAdjustment} from 'services/analytics/adjustments'

import {emptyTitles} from './const'

import style from './styles/Bid.module.scss'

const statsMeta = [
  ['CPC', 'clicks', 'rub'],
  ['CPL', 'leads', 'rub'],
  ['ROI', 'spent', '%', ' rub']
]

const makeStats = (item, index) => ({
  name: statsMeta[index][0],
  value: item[0].toFixed(0),
  diff: '-',
  dimension: statsMeta[index][2],
  extra: {
    value: item[1].toFixed(0) + (statsMeta[index][3] || ''),
    label: statsMeta[index][1]
  }
})

function calcRecomendation(bid, params, {clicks, leads_cost, leads, CPC, ROI}) {
  const allParams = {
    roi: ROI, cost: leads_cost, troi: params.troi, tcost: params.tcost,
    cpc: bid, minCPC: params.rate.min, maxCPC: params.rate.max,
    maxAdjustment: params.adjustmentMax ? params.adjustmentMax / 100 : 0
  }

  if (clicks < params.clicks) {
    return [bid, bid]
  }

  const roiAdj = calcRoiAdjustment(allParams)
  const leadAdj = calcLeadAdjustment(allParams)
  return [bid + roiAdj < bid ? bid : bid + roiAdj, bid + leadAdj > bid ? bid : bid + leadAdj]
}

class Bid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: '',
      rateChange: this.getInitialRate(props),
      offset: 0,
      pageXFrom: 0,
      isSwiping: true
    }
  }

  getInitialRate(props) {
    if (props.data && props.data.attributes.metrics) {
      const {bid, metrics} = props.data.attributes
      return calcRecomendation(bid, props.params, metrics)[1]
    }
    return 0
  }

  saveChart = ref => this.chart = ref

  handleInput = event => {
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  handleClick = event => {
    const {popup, onChange} = this.props
    const {rateChange, comment} = this.state

    if (typeof onChange === 'function') {
      onChange('changeBid', {
        popupId: popup.id,
        phraseId: popup.target,
        newBid: parseFloat(rateChange),
        message: comment
      })
    }
  }

  getChartHeight(value, max) {
    return `${value * 100 / max}%`
  }

  handleStart = event => {
    const {pageX} = event
    const {scrollLeft} = this.chart
    this.setState({
      isSwiping: true,
      offset: scrollLeft,
      pageXFrom: pageX
    })
  }

  handleMove = event => {
    const {isSwiping} = this.state
    if (isSwiping) {
      const {pageX} = event
      const {offset, pageXFrom} = this.state
      this.chart.scrollLeft = offset - (pageX - pageXFrom)
    }
  }

  handleEnd = event => {
    const {isSwiping} = this.state
    if (isSwiping) {
      this.setState({isSwiping: false})
    }
  }

  getStats() {
    const {metrics} = this.props.popup
    const {clicks, leads, cost, CPC, leads_cost, ROI} = metrics
    return [
      [CPC, clicks],
      [leads_cost, leads],
      [ROI, cost]
    ].map(makeStats)
  }

  getButtonIcon = status => {
    switch (status) {
      case 'none':
        return <Icon className={style.icon} icon="play" />
      case 'done':
        return <Icon className={style.icon} icon="done" />
      case 'error':
        return <Icon className={style.icon} icon="error" />
      case 'updating':
        return <img className={style.updating} src="/assets/img/bid_updating.svg" alt="loading" />
      default:
        return 'Undefined status: ' + status
    }
  }

  renderHistory(max, changes) {
    const {history} = this.props.popup
    const isFetching = history === null
    if (isFetching) {
      return <div className={style.preloader}></div>
    }
    return (
      <div
        ref={this.saveChart}
        className={style.chart}
        onMouseDown={this.handleStart}
        onMouseMove={this.handleMove}
        onMouseUp={this.handleEnd}
        onMouseLeave={this.handleEnd}
      >
        {changes.map((item, index) => (
          <ChartItem
            key={item.date + index}
            index={index}
            height={this.getChartHeight(item.value, max)}
            column={item}
          />
        ))}
      </div>
    )
  }

  render() {
    const {comment, rateChange} = this.state
    const {popup, params, adjustmentColumns} = this.props
    const {metrics, history, selected, target, opStatus} = popup

    if (selected === 0 && typeof target === 'string') {
      return (
        <div className={style.bid}>
          <p className={style.emptyText}>Select {emptyTitles[target]}.</p>
        </div>
      )
    }

    const isMultiple = popup.target === 'phrases'
    const changes = history ? history.changes : []
    const bid = history ? history.bid : 0
    const stats = this.getStats()
    const max = Math.max.apply(null, changes.map(i => i.value))
    const recomended = calcRecomendation(bid, params, metrics)
    return (
      <div className={style.bid}>
        {!isMultiple && this.renderHistory(max, changes)}
        <div className={style.data}>
          <div className={style.stats}>
            {stats.map((s, i) => (
              <div key={i} className={style.item}>
                <h4 className={style.itemHeader}><span className={style.itemHeaderText}>{s.name}</span> {selected !== 0 && <span className={style.selectedCount}>{selected}</span>}</h4>
                <p className={style.itemCurrent}>{s.value} {s.dimension}</p>
                <p className={style.itemDiff}>{s.diff} {s.dimension}</p>
                <span className={style.itemLabel}>{s.extra.value} {s.extra.label}</span>
              </div>
            ))}
          </div>
          <div className={style.rate}>
            <div className={style.comment}>
              <input
                className={style.commentInput}
                name="comment"
                type="text"
                placeholder="Your comment.."
                value={comment}
                onChange={this.handleInput}
              />
            </div>
            <div className={selected === 0 ? style.rateChange : style.rateChangeMulti}>
              {selected === 0 && <Fragment>
                <span className={style.rateClicks}>{changes.length}</span>
                <p className={style.rateCurrent}>{bid === 0 ? '—' : bid} {bid !== 0 && <small className={style.rateSmall}>rub</small>}</p>
                {(adjustmentColumns[0] || adjustmentColumns[1]) && <p className={style.rateOffer}>
                  {adjustmentColumns[0] && <span className={`${style.rateOfferRoi} ${(recomended[0] !== bid && bid !== 0) && style.active}`}>{recomended[0] === bid || bid === 0 ? '—' : recomended[0]}</span>}
                  {(adjustmentColumns[0] && adjustmentColumns[1]) && ' | ' }
                  {adjustmentColumns[1] && <span className={`${style.rateOfferLead} ${(recomended[1] !== bid && bid !== 0) && style.active}`}>{recomended[1] === bid || bid === 0 ? '—' : recomended[1]}</span>}
                  {(recomended[0] !== bid || recomended[1] !== bid) && <small className={style.rateSmall}> р.</small>}
                </p>}
              </Fragment>}
              <input
                className={selected === 0 ? style.rateInput : style.rateInputMulti}
                name="rateChange"
                type="text"
                value={rateChange}
                onChange={this.handleInput}
              />
              <button className={opStatus === 'none' ? style.confirm : style.confirmDisabled} onClick={this.handleClick}>
                {this.getButtonIcon(opStatus)}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Bid
