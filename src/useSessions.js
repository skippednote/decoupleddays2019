import { useState, useEffect } from "react";
import axios from "axios";
import normalize from "json-api-normalize";
import { navigate } from "@reach/router";

class UseSession {
  constructor(url = "", fields = null) {
    this.url = url;
    this.fields = fields;
    this.defaultFields = [
      "id",
      "title",
      "created",
      "field_room",
      "field_date",
      "field_len",
      "field_speaker.field_name",
      "field_speaker.user_picture.uri",
      "field_track.name"
    ];
    this.baseURL = `http://testing.dd:8083/api/node/session`;
  }

  getSessions() {
    const [sessions, setSessions] = useState(null);

    useEffect(() => {
      const get = async () => {
        try {
          const url = this._generateURL(this.url);
          const { data: response } = await axios.get(url);
          let f = [...this.defaultFields];
          if (this.fields) {
            f = [...f, ...this.fields];
          }
          const normalizedData = normalize(response).get(f);
          setSessions(normalizedData);
        } catch (e) {
          setSessions(null);
        }
      };

      get();
    }, []);

    return sessions;
  }

  async createSession(data) {
    const { data: response } = await axios.post(this.baseURL, data, {
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: window.localStorage.getItem("token")
      }
    });

    navigate("/sessions/" + response.data.id);
  }

  async updateSession(data) {
    const { data: response } = await axios.patch(
      `${this.baseURL}/${data.data.id}`,
      data,
      {
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          Authorization: window.localStorage.getItem("token")
        }
      }
    );

    navigate("/sessions/" + response.data.id);
  }

  _generateURL(subpath = "") {
    const queryParams = `?include=field_speaker,field_speaker.user_picture,field_track&sort=-created`;
    return `${this.baseURL}/${subpath}${queryParams}`;
  }
}

export { UseSession };
