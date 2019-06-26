import React, { useEffect, useState } from "react";
import { UseSession } from "./useSessions";
import { navigate } from "@reach/router";
import axios from "axios";

function Create() {
  const token = window.localStorage.getItem("token");
  const [tracks, setTracks] = useState(null);
  useEffect(() => {
    const getTracks = async () => {
      const { data: response } = await axios.get(
        "http://testing.dd:8083/api/taxonomy_term/track"
      );
      setTracks(response);
    };

    getTracks();
  }, []);

  const submit = e => {
    e.preventDefault();
    const {
      title,
      body,
      room,
      date,
      sessionlength,
      time,
      track
    } = e.target.elements;

    const data = {
      data: {
        type: "node--session",
        attributes: {
          title: title.value,
          body: {
            value: body.value,
            format: "plain_text"
          },
          field_len: Number(sessionlength.value),
          field_room: room.value,
          field_date: `${date.value}T${time.value}:00+00:00`
        },
        relationships: {
          field_track: {
            data: {
              type: "taxonomy_term--track",
              id: track.value
            }
          }
        }
      }
    };

    new UseSession().createSession(data);
  };

  if (!token) {
    navigate("/login");
  }

  return (
    <div>
      <h1>Create</h1>

      <form onSubmit={submit}>
        <input type="text" placeholder="title" name="title" />
        <textarea placeholder="body" name="body" />
        <select name="room">
          <option value="room1">Room 1</option>
          <option value="room2">Room 2</option>
          <option value="room3">Room 3</option>
          <option value="room4">Room 4</option>
        </select>
        <input type="date" name="date" />
        <input type="time" name="time" />
        <select name="sessionlength">
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
        {tracks && (
          <select name="track">
            {tracks.data.map(t => (
              <option value={t.id}>{t.attributes.name}</option>
            ))}
          </select>
        )}
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export { Create };
