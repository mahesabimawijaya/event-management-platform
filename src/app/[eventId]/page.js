"use client";

// TransactionForm.js
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import useSWR from "swr";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";

const TransactionForm = ({ params }) => {
  const router = useRouter();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/event/${params.eventId}`,
    fetcher
  );
  if (error) return <Error />;
  if (isLoading) return <Loading />;

  const ticketTypes = data.tickets;

  const initialValues = {
    tickets: ticketTypes.reduce((acc, ticket) => {
      acc[ticket.id] = 0;
      return acc;
    }, {}),
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      // Make API request to create a transaction
      const transformedValues = {
        tickets: Object.entries(values.tickets).map(([id, quantity]) => ({
          id: parseInt(id, 10), // Convert the id to a number
          quantity: parseInt(quantity, 10), // Convert the quantity to a number
        })),
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/transaction`,
        transformedValues
      );
      alert("Transaction created successfully!");
      router.push(`/events/${params.eventId}`);
    } catch (error) {
      console.error("Error creating transaction:", error);
      alert("Error creating transaction. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form className="max-w-md mx-auto pt-[120px] mb-[200px]">
        {ticketTypes.map((ticket) => (
          <div key={ticket.id} className="mb-4">
            <label
              htmlFor={`tickets.${ticket.id}`}
              className="block text-sm font-medium text-gray-700"
            >
              {ticket.category} Tickets:
            </label>
            <Field
              type="number"
              id={`tickets.${ticket.id}`}
              name={`tickets.${ticket.id}`}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage
              name={`tickets.${ticket.id}`}
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
        ))}
        <div className="mt-10">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Buy Ticket
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default TransactionForm;
