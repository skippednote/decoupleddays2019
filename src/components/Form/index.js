import React from "react";
import { Formik } from "formik";
import CKEditor from "react-ckeditor-component";
import Select from "react-select";
import { FiPlusCircle, FiEdit2 } from "react-icons/fi";
import { getDate } from "../../utils/getDate";

const initialValues = {
  title: "",
  body: "",
  room: "room1",
  date: "",
  time: "",
  slength: "25",
  speakers: ""
};

const validator = values => {
  let errors = {};
  if (!values.title) {
    errors.title = "Title is required";
  }

  if (!values.body) {
    errors.body = "Body is required";
  }

  if (!values.date) {
    errors.date = "Date is required";
  }

  if (!values.time) {
    errors.time = "Time is required";
  }

  if (!values.speakers) {
    errors.speakers = "Speakers is required";
  }

  return errors;
};

const initialValuesGenerator = (categories, session) => {
  if (session) {
    const { fullDate, time } = getDate(session.field_date);

    return {
      title: session.title || initialValues.title,
      body: session.body.value || initialValues.body,
      room: session.field_room || initialValues.room,
      date: fullDate || initialValues.date,
      time: time || initialValues.time,
      slength: session.field_length || initialValues.slength,
      category: session.field_category.id || categories[0].id,
      speakers:
        (session.field_speakers &&
          session.field_speakers.map(s => ({
            value: s.id,
            label: s.field_full_name || "Anonymous"
          }))) ||
        initialValues.speakers
    };
  }

  return {
    ...initialValues,
    category: categories[0].value
  };
};

function Form({ users, categories, submitHandler, session = null }) {
  return (
    <Formik
      initialValues={initialValuesGenerator(categories, session)}
      validate={validator}
      onSubmit={(values, { setSubmitting }) => {
        submitHandler(values);
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        isSubmitting
      }) => (
        <>
          {Boolean(Object.keys(errors).length) && (
            <div data-testid="form-error">
              All the required form fields need to be populated.
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-item">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.title && touched.title && errors.title}
            </div>

            <div className="form-item">
              <label htmlFor="body">Body</label>
              <CKEditor
                id="body"
                content={values.body}
                events={{
                  change: e => setFieldValue("body", e.editor.getData()),
                  blur: () => setFieldTouched("body", true)
                }}
              />
              {errors.body && touched.body && errors.body}
            </div>
            <div className="form-wrapper">
              <div className="form-item">
                <label htmlFor="room">Room</label>
                <select
                  id="room"
                  name="room"
                  value={values.room}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="room1">Room 1</option>
                  <option value="room2">Room 2</option>
                  <option value="room3">Room 3</option>
                  <option value="room4">Room 4</option>
                </select>
                {errors.room && touched.room && errors.room}
              </div>

              <div className="form-item">
                <label htmlFor="date">Date</label>
                <input
                  id="date"
                  name="date"
                  value={values.date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="date"
                />
                {errors.date && touched.date && errors.date}
              </div>

              <div className="form-item">
                <label htmlFor="time">Time</label>
                <input
                  id="time"
                  name="time"
                  step="1"
                  value={values.time}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="time"
                />
                {errors.time && touched.time && errors.time}
              </div>

              <div className="form-item">
                <label htmlFor="slength">sLength</label>
                <select
                  id="slength"
                  name="slength"
                  value={values.slength}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                >
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
                {errors.slength && touched.slength && errors.slength}
              </div>

              <div className="form-item">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  defaultValue={values.category}
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                {errors.category && touched.category && errors.category}
              </div>

              <div className="form-item">
                <label htmlFor="speakers">Speakers</label>
                <Select
                  className="react-select"
                  placeholder="Select speakers"
                  value={values.speakers}
                  onBlur={() => setFieldTouched("speakers", true)}
                  onChange={selectedOptions =>
                    setFieldValue("speakers", selectedOptions)
                  }
                  options={users}
                  isMulti
                />
                {errors.speakers && touched.speakers && errors.speakers}
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="button">
              {session ? (
                <>
                  <FiEdit2 />
                  &nbsp;&nbsp; Edit
                </>
              ) : (
                <>
                  <FiPlusCircle />
                  &nbsp;&nbsp; Create
                </>
              )}
            </button>
          </form>
        </>
      )}
    </Formik>
  );
}

export default Form;
