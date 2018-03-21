import React from 'react'
import PropTypes from 'prop-types'

/**
 * Represents a single item in the "Visible Fields" drop-down
 */
export default class OptionalField extends React.Component {
  static propTypes = {
    /** callback function to enable the optional field and save it to user preferences */
    onChange: PropTypes.func.isRequired,
    /** the api key used for this particular field */
    fieldKey: PropTypes.string,
    /** whether or not the field is enabled (displayed) */
    enabled: PropTypes.bool,
    /** the display text for the field */
    name: PropTypes.string,
  }

  static defaultProps = {
    enabled: false,
  }

  /**
   * Toggles an optional field to be displayed by the objectlist
   *
   * @event {MouseEvent} event - event that fires when clicking on an OptionalField component
   */
  toggle = (event) => {
    event.preventDefault()
    this.props.onChange(this.props.fieldKey)
  }

  render() {
    let checked
    if (this.props.enabled) {
      checked = (<i className="fa fa-check-square-o objectlist-dropdown__icon" aria-hidden="true" />)
    } else {
      checked = (<i className="fa fa-square-o objectlist-dropdown__icon" aria-hidden="true" />)
    }
    return (
      <button className="objectlist-dropdown__item" onClick={this.toggle}>
        {checked}{this.props.name}
      </button>
    )
  }
}
