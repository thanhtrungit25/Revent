/*global google*/
import React, { Component } from "react"
import { reduxForm, Field } from "redux-form"
import { connect } from "react-redux"
import { Grid, Header, Segment, Form, Button } from "semantic-ui-react"
import Script from "react-load-script"
import { googleApiKey } from "../../../app/config/keys"
import { geocodeByAddress, getLatLng } from "react-places-autocomplete"

import { category } from "../../../app/data/eventData"
import { createEvent } from "../eventActions"
import { validate } from "../../../app/common/form/formValidate"
import TextInput from "../../../app/common/form/TextInput"
import TextArea from "../../../app/common/form/TextArea"
import SelectInput from "../../../app/common/form/SelectInput"
import DateInput from "../../../app/common/form/DateInput"
import PlaceInput from "../../../app/common/form/PlaceInput"

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  }

  handleScriptLoad = () => {
    this.setState({ scriptLoaded: true })
  }

  handleCitySelect = selectedCity => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          cityLatLng: latlng
        })
      })
      .then(() => {
        this.props.change("city", selectedCity)
      })
      .catch(error => console.error("Error", error))
  }

  handleVenueSelect = selectedVenue => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          venueLatLng: latlng
        })
      })
      .then(() => {
        this.props.change("venue", selectedVenue)
      })
      .catch(error => console.error("Error", error))
  }

  onFormSubmit = values => {
    const { createEvent } = this.props
    values.venueLatLng = this.state.venueLatLng

    createEvent(values)
  }

  render() {
    const { invalid, submitting, pristine, history } = this.props
    return (
      <Grid>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`}
          onLoad={this.handleScriptLoad}
        />
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details" />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                name="title"
                type="text"
                component={TextInput}
                placeholder="Give your event a name"
              />
              <Field
                name="category"
                type="text"
                component={SelectInput}
                options={category}
                placeholder="What is your event about"
              />
              <Field
                name="description"
                type="text"
                rows={3}
                component={TextArea}
                placeholder="Tell us about your event"
              />
              <Header sub color="teal" content="Event Location Details" />
              <Field
                name="city"
                type="text"
                component={PlaceInput}
                options={{ type: ["(  )"] }}
                placeholder="Event City"
                onSelect={this.handleCitySelect}
              />
              {this.state.scriptLoaded && (
                <Field
                  name="venue"
                  type="text"
                  component={PlaceInput}
                  options={{
                    location: new google.maps.LatLng(this.state.cityLatLng),
                    radius: 1000,
                    type: ["establishments"]
                  }}
                  placeholder="Event Venue"
                  onSelect={this.handleVenueSelect}
                />
              )}
              <Field
                name="date"
                type="text"
                component={DateInput}
                dateFormat="yyyy-MM-d HH:mm"
                timeFormat="HH:mm"
                showTimeSelect
                placeholder="Event Date"
              />
              <Button
                positive
                type="submit"
                disabled={invalid || submitting || pristine}
              >
                Submit
              </Button>
              <Button type="button" onClick={history.goBack}>
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

export default connect(
  null,
  { createEvent }
)(reduxForm({ form: "eventForm", validate })(EventForm))
