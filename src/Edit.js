import React from "react";
import { UseSession } from "./useSessions";

function Edit({ id }) {
  const rooms = [
    { mn: "room1", value: "Room 1" },
    { mn: "room2", value: "Room 2" },
    { mn: "room3", value: "Room 3" }
  ];
  const session = new UseSession(id, ["body"]).getSessions();

  const submit = e => {
    e.preventDefault();
    const { title, body, room, date, sessionlength, time } = e.target.elements;

    const data = {
      data: {
        type: "node--session",
        id: session.id,
        attributes: {
          title: title.value,
          body: {
            value: body.value,
            format: "plain_text"
          },
          field_len: Number(sessionlength.value),
          field_room: room.value,
          field_date: `${date.value}T${time.value}:00+00:00`
        }
      }
    };

    new UseSession().updateSession(data);
  };

  if (session) {
    let time, date, timeWithTZ;
    if (session.field_date) {
      [date, timeWithTZ] = session.field_date.split("T");
      time = timeWithTZ.split(":00")[0];
    }
    return (
      <form onSubmit={submit}>
        {session.field_date}
        <input
          type="text"
          placeholder="title"
          name="title"
          defaultValue={session.title}
        />
        <textarea
          placeholder="body"
          name="body"
          defaultValue={session.body.value}
        />
        <select name="room" defaultValue={session.field_room}>
          {rooms.map(r => {
            return <option value={r.mn}>{r.value}</option>;
          })}
        </select>
        <input type="date" name="date" defaultValue={date} />
        <input type="time" name="time" defaultValue={time} />
        <select name="sessionlength">
          <option defaultValue="25">25</option>
          <option defaultValue="50">50</option>
        </select>

        <button type="submit">Update</button>
      </form>
    );
  }

  return <div>Loading...</div>;
}

export { Edit };
