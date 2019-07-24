export const sessions = [
  {
    id: "017a6b73-fdcb-473f-aa49-8ae0073ab076",
    title: "a",
    created: "2019-07-07T12:11:00+00:00",
    field_room: "room1",
    field_date: "2019-07-09T00:01:00+00:00",
    field_length: 25,
    field_speakers: [
      {
        id: "e2a46742-c456-4de1-965f-1458f9fcede7",
        user_picture: {
          uri: {
            value: "public://pictures/2019-07/index.jpeg",
            url: "/sites/default/files/pictures/2019-07/index.jpeg"
          }
        },
        field_full_name: "Bassam Ismail",
        field_company: "Axelerant"
      }
    ],
    field_category: {
      id: "5f4c52c0-1e35-4b5f-913a-19af9be63843",
      name: "Decoupled Drupal"
    },
    body: {
      value: "<p>Hello body</p>\n",
      format: "full_html",
      processed: "<p>Hello body</p>\n",
      summary: null
    }
  },
  {
    id: "8a940125-c1ab-40f0-abfb-c45ee7a926a0",
    title: "edit",
    created: "2019-07-06T05:36:27+00:00",
    field_room: "room2",
    field_date: "2019-07-10T01:01:00+00:00",
    field_length: 25,
    field_speakers: [
      {
        id: "e2a46742-c456-4de1-965f-1458f9fcede7",
        user_picture: {
          uri: {
            value: "public://pictures/2019-07/index.jpeg",
            url: "/sites/default/files/pictures/2019-07/index.jpeg"
          }
        },
        field_full_name: "Bassam Ismail",
        field_company: "Axelerant"
      }
    ],
    field_category: {
      id: "67c27c5c-89dd-4de7-a97a-ac25d47442a4",
      name: "JavaScript and JAMstack"
    },
    body: {
      value: "<p><strong>Hoi</strong></p>\n",
      format: "full_html",
      processed: "<p><strong>Hoi</strong></p>\n",
      summary: null
    }
  },
  {
    id: "10ba43a8-f0ef-4e8c-8954-77caf2261833",
    title: "3",
    created: "2019-07-06T05:10:54+00:00",
    field_room: "room3",
    field_date: "3333-03-31T03:03:00+00:00",
    field_length: 50,
    field_speakers: [
      {
        id: "7b06fc8c-4038-49f8-97b1-e4b965214489"
      }
    ],
    field_category: {
      id: "67c27c5c-89dd-4de7-a97a-ac25d47442a4",
      name: "JavaScript and JAMstack"
    },
    body: {
      value: "<p>3</p>\n",
      format: "full_html",
      processed: "<p>3</p>\n",
      summary: null
    }
  },
  {
    id: "8f462bbf-193e-401e-a02d-cdb4e51d0946",
    title: "Hello",
    created: "2019-07-06T04:59:28+00:00",
    field_room: "room1",
    field_date: "2019-07-17T01:02:00+00:00",
    field_length: 50,
    field_speakers: [
      {
        id: "e2a46742-c456-4de1-965f-1458f9fcede7",
        user_picture: {
          uri: {
            value: "public://pictures/2019-07/index.jpeg",
            url: "/sites/default/files/pictures/2019-07/index.jpeg"
          }
        },
        field_full_name: "Bassam Ismail",
        field_company: "Axelerant"
      }
    ],
    field_category: {
      id: "67c27c5c-89dd-4de7-a97a-ac25d47442a4",
      name: "JavaScript and JAMstack"
    },
    body: {
      value: "<p>Ho</p>\n",
      format: "full_html",
      processed: "<p>Ho</p>\n",
      summary: null
    }
  }
];

export const categories = [
  {
    value: "5f4c52c0-1e35-4b5f-913a-19af9be63843",
    label: "Decoupled Drupal"
  },
  {
    value: "67c27c5c-89dd-4de7-a97a-ac25d47442a4",
    label: "JavaScript and JAMstack"
  }
];

export const users = [
  {
    value: "7b06fc8c-4038-49f8-97b1-e4b965214489",
    label: "Anonymous"
  },
  {
    value: "e2a46742-c456-4de1-965f-1458f9fcede7",
    label: "Bassam Ismail"
  },
  {
    value: "bf24350e-acd0-4f34-b686-b005b94e3157",
    label: "Bassam Ismail"
  }
];

export const submitValue = {
  body: { body: "Hello world" },
  category: "67c27c5c-89dd-4de7-a97a-ac25d47442a4",
  date: "2019-07-18",
  room: "room2",
  slength: "50",
  speakers: [
    { label: "Anonymous", value: "7b06fc8c-4038-49f8-97b1-e4b965214489" },
    { label: "Bassam Ismail", value: "e2a46742-c456-4de1-965f-1458f9fcede7" }
  ],
  time: "10:15",
  title: "Title"
};

export const editSession = {
  id: "8a940125-c1ab-40f0-abfb-c45ee7a926a0",
  title: "edit",
  created: "2019-07-06T05:36:27+00:00",
  field_room: "room2",
  field_date: "2019-07-10T01:01:00+00:00",
  field_length: 25,
  field_speakers: [
    {
      id: "e2a46742-c456-4de1-965f-1458f9fcede7",
      user_picture: {
        uri: {
          value: "public://pictures/2019-07/index.jpeg",
          url: "/sites/default/files/pictures/2019-07/index.jpeg"
        }
      },
      field_full_name: "Bassam Ismail",
      field_company: "Axelerant"
    }
  ],
  field_category: {
    id: "67c27c5c-89dd-4de7-a97a-ac25d47442a4",
    name: "JavaScript and JAMstack"
  },
  body: {
    value: "<p><strong>Hoi</strong></p>\n",
    format: "full_html",
    processed: "<p><strong>Hoi</strong></p>\n",
    summary: null
  }
};

export const createSessionDefault = {
  id: false,
  error: false
};

export const createSessionSuccess = {
  id: 3000,
  error: false
};

export const createSessionError = {
  id: false,
  error: true
};

export const deleteSessionSuccess = {
  success: true,
  error: false
};
