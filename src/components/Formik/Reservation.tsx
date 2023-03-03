import { ChangeEvent, Component, FormEvent } from 'react';

interface ReservationProps {}
interface ReservationState {
  isGoing?: boolean;
  numberOfGuests?: number;
}

interface MiniFormikProps {
  children: (props: MiniFormikState) => JSX.Element;
  initialValues: ReservationState;
  onSubmit: (values: ReservationState) => void;
}
interface MiniFormikState {
  values: ReservationState;
  touched: ReservationState;
  errors: ReservationState;
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit?: (event: FormEvent) => void;
}

class MiniFormik extends Component<MiniFormikProps, MiniFormikState> {
  state = {
    values: this.props.initialValues || {},
    touched: {},
    errors: {},
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    event.persist();
    this.setState((prevState) => ({
      values: {
        ...prevState.values,
        [name]: value,
      },
    }));
  };

  handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const name = target.name;
    event.persist();
    this.setState((prevState) => ({
      touched: {
        ...prevState.touched,
        [name]: true,
      },
    }));
  };

  handleSubmit = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    this.props.onSubmit(this.state.values);
  };

  render() {
    return this.props.children({
      ...this.state,
      handleChange: this.handleChange,
      handleBlur: this.handleBlur,
      handleSubmit: this.handleSubmit,
    });
  }
}

export default class Reservation extends Component {
  render() {
    return (
      <MiniFormik
        initialValues={{
          isGoing: true,
          numberOfGuests: 4,
        }}
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      >
        {(props) => {
          const { values, handleChange, handleBlur, handleSubmit } = props;
          return (
            <form onSubmit={handleSubmit}>
              <label>
                Is going:
                <input
                  name="isGoing"
                  type="checkbox"
                  checked={values.isGoing}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </label>
              <br />
              <label>
                Number of guests:
                <input
                  name="numberOfGuests"
                  type="number"
                  value={values.numberOfGuests}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </label>
              <pre>{JSON.stringify(props, null, 2)}</pre>
            </form>
          );
        }}
      </MiniFormik>
    );
  }
}
