export const enterFormValues = (getByLabelText, getByTestId, fireEvent) => {
  const events = [
    {
      value: "Title",
      element: getByLabelText(/title/i)
    },
    {
      value: "2019-07-18",
      element: getByLabelText(/date/i)
    },
    {
      value: "10:15",
      element: getByLabelText(/time/i)
    },
    {
      value: "room2",
      element: getByLabelText(/room/i)
    },
    {
      value: "50",
      element: getByLabelText(/length/i)
    },
    {
      value: "67c27c5c-89dd-4de7-a97a-ac25d47442a4",
      element: getByLabelText(/category/i)
    },
    {
      value: "e2a46742-c456-4de1-965f-1458f9fcede7",
      element: getByTestId("select")
    },
    {
      value: "7b06fc8c-4038-49f8-97b1-e4b965214489",
      element: getByTestId("select")
    },
    {
      value: "Hello world",
      element: getByTestId("textarea")
    }
  ];

  events.forEach(event => {
    fireEvent.change(event.element, { target: { value: event.value } });
  });
};
