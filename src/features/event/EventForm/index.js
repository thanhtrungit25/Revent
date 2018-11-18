import React, { Component } from "react"
import { Segment, Form, Button } from "semantic-ui-react"

const emptyEvent = {
  title: "",
  date: "",
  city: "",
  venue: "",
  hostedBy: ""
}
class EventForm extends Component {
  state = { event: emptyEvent }

  componentDidMount() {
    this.props.selectedEvent &&
      this.setState({
        event: this.props.selectedEvent
      })
  }

  componentWillReceiveProps(nextProps) {
    nextProps.selectedEvent !== this.props.selectedEvent &&
      this.setState({
        event: nextProps.selectedEvent || emptyEvent
      })
  }

  handleFormSubmit = e => {
    e.preventDefault()

    const { event } = this.state
    const { handleCreateEvent, handleUpdateEvent } = this.props
    event.id ? updateEvent(event) : createEvent(event)
  }

  handleInputChange = e => {
    const newEvent = this.state.event
    newEvent[e.target.name] = e.target.value

    this.setState({ event: newEvent })
  }

  render() {
    const { event } = this.state
    const { handleCancel } = this.props
    return (
      <Segment>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Field>
            <label>Event Title</label>
            <input
              name="title"
              value={event.title}
              placeholder="Event Title"
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input
              type="date"
              name="date"
              value={event.date}
              placeholder="Event date"
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              name="city"
              value={event.city}
              placeholder="City event is taking place"
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input
              name="venue"
              value={event.venue}
              placeholder="Enter the Venue of the event"
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              name="hostedBy"
              value={event.hostedBy}
              placeholder="Enter the name of person hosting"
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button type="button" onClick={handleCancel}>
            Cancel
          </Button>
        </Form>
      </Segment>
    )
  }
}

export default EventForm
