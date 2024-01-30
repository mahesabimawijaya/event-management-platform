"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const eventValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.string().url("Invalid URL format"),
  start_date: Yup.date().required("Start date is required"),
  end_date: Yup.date().required("End date is required"),
  start_time: Yup.string()
    .required("Start time is required")
    .test("valid-time", "Invalid time format", (value) => {
      // Regular expression to check if the time is in HH:mm format
      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
      return timeRegex.test(value);
    }),
  end_time: Yup.string()
    .required("End time is required")
    .test("valid-time", "Invalid time format", (value) => {
      // Regular expression to check if the time is in HH:mm format
      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
      return timeRegex.test(value);
    }),
  location: Yup.string().required("Location is required"),
  type: Yup.string().required("Type is required"),
});

const ticketValidationSchema = Yup.object().shape({
  code: Yup.string().required("Code is required"),
  price: Yup.number().required("Price is required"),
  quantity: Yup.number()
    .required("Quantity is required")
    .integer("Quantity must be an integer"),
  available: Yup.number().required("Availability is required"),
  category: Yup.string().required("Category is required"),
});

const CreateEventTicketForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      image: "",
      start_date: "",
      end_date: "",
      start_time: "",
      end_time: "",
      location: "",
      type: "", // "Free" or "Paid"
      tickets: [
        {
          code: "",
          price: 0,
          quantity: 0,
          available: 0,
          category: "",
        },
      ],
    },
    validationSchema: eventValidationSchema.concat(
      Yup.object().shape({
        tickets: Yup.array().of(ticketValidationSchema),
      })
    ),
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      values.start_date = new Date(
        `${values.start_date}T${values.start_time}:00.000Z`
      );
      values.start_time = new Date(
        `${values.start_date}T${values.start_time}:00.000Z`
      );
      values.end_date = new Date(
        `${values.end_date}T${values.end_time}:00.000Z`
      );
      values.end_time = new Date(
        `${values.end_date}T${values.end_time}:00.000Z`
      );

      console.log(values);
      try {
        // Call the API endpoint
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/event`,
          values
        );

        // Handle success
        setSuccess(true);
        console.log(response.data);
      } catch (err) {
        // Handle error
        setError("Error creating event and tickets");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="pt-[80px]">
      <div className="text-xl font-semibold text-center mt-5 mb-10">
        Event Form
      </div>
      <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto">
        {/* Event Fields */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Event Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {formik.touched.name && !formik.values.name && (
            <div className="text-red-500 text-sm">Event Name is required</div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600"
          >
            Event Description:
          </label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {formik.errors.description && formik.touched.description && (
            <div className="text-red-500 text-sm">
              {formik.errors.description}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-600"
          >
            Event Image URL:
          </label>
          <input
            type="text"
            id="image"
            name="image"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.image}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {formik.errors.image && formik.touched.image && (
            <div className="text-red-500 text-sm">{formik.errors.image}</div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-600"
          >
            Type:
          </label>
          <select
            id="type"
            name="type"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.type}
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value="">Select Type</option>
            <option value="Free">Free</option>
            <option value="Paid">Paid</option>
          </select>
          {formik.errors.type && formik.touched.type && (
            <div className="text-red-500 text-sm">{formik.errors.type}</div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="start_date"
            className="block text-sm font-medium text-gray-600"
          >
            Event Start Date:
          </label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.start_date}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {formik.errors.start_date && formik.touched.start_date && (
            <div className="text-red-500 text-sm">
              {formik.errors.start_date}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="end_date"
            className="block text-sm font-medium text-gray-600"
          >
            Event End Date:
          </label>
          <input
            type="date"
            id="end_date"
            name="end_date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.end_date}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {formik.errors.end_date && formik.touched.end_date && (
            <div className="text-red-500 text-sm">{formik.errors.end_date}</div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="start_time"
            className="block text-sm font-medium text-gray-600"
          >
            Event Start Time:
          </label>
          <input
            type="time"
            id="start_time"
            name="start_time"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.start_time}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {formik.errors.start_time && formik.touched.start_time && (
            <div className="text-red-500 text-sm">
              {formik.errors.start_time}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="end_time"
            className="block text-sm font-medium text-gray-600"
          >
            Event End Time:
          </label>
          <input
            type="time"
            id="end_time"
            name="end_time"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.end_time}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {formik.errors.end_time && formik.touched.end_time && (
            <div className="text-red-500 text-sm">{formik.errors.end_time}</div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-600"
          >
            Event Location:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.location}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {formik.touched.location && !formik.values.location && (
            <div className="text-red-500 text-sm">
              Event Location is required
            </div>
          )}
        </div>
        {/* Add other event fields ( end_time, location, type) */}
        {/* ... */}

        {/* Ticket Fields */}
        <div className="mb-4">
          <label
            htmlFor="code"
            className="block text-sm font-medium text-gray-600"
          >
            Ticket Code:
          </label>
          <input
            type="text"
            id="code"
            name="tickets[0].code"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.tickets[0].code}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {formik.errors.tickets &&
            formik.touched.tickets &&
            formik.errors.tickets[0]?.code && (
              <div className="text-red-500 text-sm">
                {formik.errors.tickets[0]?.code}
              </div>
            )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-600"
          >
            Ticket Price:
          </label>
          <input
            type="number"
            id="price"
            name="tickets[0].price"
            onChange={formik.handleChange}
            value={formik.values.tickets[0].price}
            disabled={formik.values.type === "Free"} // Disable if type is "Free"
            className="mt-1 p-2 w-full border rounded-md"
          />
          {formik.errors.tickets &&
            formik.touched.tickets &&
            formik.errors.tickets[0]?.price && (
              <div className="text-red-500 text-sm">
                {formik.errors.tickets[0]?.price}
              </div>
            )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-600"
          >
            Ticket Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            name="tickets[0].quantity"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.tickets[0].quantity}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {formik.errors.tickets &&
            formik.touched.tickets &&
            formik.errors.tickets[0]?.quantity && (
              <div className="text-red-500 text-sm">
                {formik.errors.tickets[0]?.quantity}
              </div>
            )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="available"
            className="block text-sm font-medium text-gray-600"
          >
            Ticket Availability:
          </label>
          <input
            type="number"
            id="available"
            name="tickets[0].available"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            checked={formik.values.tickets[0].available}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-600"
          >
            Ticket Category:
          </label>
          <input
            type="text"
            id="category"
            name="tickets[0].category"
            onChange={formik.handleChange}
            value={formik.values.tickets[0].category}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {formik.errors.tickets &&
            formik.touched.tickets &&
            formik.errors.tickets[0]?.category && (
              <div className="text-red-500 text-sm">
                {formik.errors.tickets[0]?.category}
              </div>
            )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Create Event and Tickets
        </button>

        {loading && <p className="mt-2 text-gray-600">Loading...</p>}
        {error && <p className="mt-2 text-red-500">{error}</p>}
        {success && (
          <p className="mt-2 text-green-500">
            Event and Tickets created successfully!
          </p>
        )}
      </form>
    </div>
  );
};

export default CreateEventTicketForm;
