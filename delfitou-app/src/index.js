import './App.css';
import React from 'react';
import { render } from 'react-dom';
import { withFormik } from 'formik';
import Yup from 'yup';
import classnames from 'classnames';

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    date: Yup.string()
      .min(2, "C'est un peu court :)")
      .required('Quel jour as-tu livré le palox ?'),
    client: Yup.string()
      .min(2, "C'est un peu court :)")
      .required('À qui as-tu livré le palox ?'),
    paloxType: Yup.string()
      .min(2, "C'est un peu court :)")
      .required('Quel type de palox as-tu livré ?'),
  }),

  mapPropsToValues: ({ user }) => ({
    ...user,
  }),
  handleSubmit: (payload, { setSubmitting }) => {
    alert(payload.paloxType);
    setSubmitting(false);
  },
  displayName: 'MyForm',
});

const InputFeedback = ({ error }) =>
  error ? (
    <div className="input-feedback">{error}</div>
  ) : null;

const Label = ({
  error,
  className,
  children,
  ...props
}) => {
  return (
    <label className="label" {...props}>
      {children}
    </label>
  );
};

const TextInput = ({
  type,
  id,
  label,
  error,
  value,
  onChange,
  className,
  ...props
}) => {
  const classes = classnames(
    'input-group',
    {
      'animated shake error': !!error,
    },
    className
  );
  return (
    <div className={classes}>
      <Label htmlFor={id} error={error}>
        {label}
      </Label>
      <input
        id={id}
        className="text-input"
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
      <InputFeedback error={error} />
    </div>
  );
};
const MyForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    isSubmitting,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        id="date"
        type="text"
        label="Date"
        placeholder="Aujourd'hui"
        error={touched.date && errors.date}
        value={values.date}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextInput
        id="client"
        type="text"
        label="Client"
        placeholder="Lumalé"
        error={touched.client && errors.client}
        value={values.client}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <TextInput
        id="paloxType"
        type="text"
        label="Type de Palox"
        placeholder="Gala"
        error={touched.paloxType && errors.paloxType}
        value={values.paloxType}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <button
        type="button"
        className="outline"
        onClick={handleReset}
        disabled={!dirty || isSubmitting}
      >
        Reset
      </button>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  );
};

const MyEnhancedForm = formikEnhancer(MyForm);


const App = () => (
  <div className="app">
    <h1>
      Nouvelle entrée de palox
    </h1>
    <p>
      Renseigner les champs suivants
    </p>

    <MyEnhancedForm
      user={{ paloxType: '', date: '', client: '' }}
    />
  </div>
);

render(<App />, document.getElementById('root'));
