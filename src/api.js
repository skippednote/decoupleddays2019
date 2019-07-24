import { useState, useEffect } from "react";
import axios from "axios";
import normalize from "json-api-normalize";
import Axios from "axios";
import * as Sentry from "@sentry/browser";

class APIFactory {
  constructor() {
    this.url = "";
    this.fields = null;
    this.defaultFields = [
      "id",
      "title",
      "created",
      "field_room",
      "field_date",
      "field_length",
      "field_speakers",
      "field_speakers.id",
      "field_speakers.user_picture.uri",
      "field_speakers.field_full_name",
      "field_speakers.field_company",
      "field_category.id",
      "field_category.name"
    ];
    this.baseURL = `http://sessions.lndo.site/api`;
  }

  getSessions(url = "", fields = []) {
    const [session, setSession] = useState(null);
    useEffect(() => {
      const cancelToken = axios.CancelToken;
      const source = cancelToken.source();
      try {
        const getS = async () => {
          const { data: response } = await axios.get(
            this._generateURL("node/session/" + url, true),
            {
              cancelToken: source.token
            }
          );
          let f = [...this.defaultFields];
          if (fields) {
            f = [...f, ...fields];
          }
          const normalizedData = normalize(response).get(f);
          setSession(normalizedData);
        };
        getS();
      } catch (error) {
        setSession("error");
        Sentry.withScope(scope => {
          scope.setExtras(error.message);
          Sentry.captureException(error);
        });
      }

      return () => source.cancel();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return session;
  }

  getCategories() {
    const [categories, setCategories] = useState(null);

    useEffect(() => {
      const cancelToken = axios.CancelToken;
      const source = cancelToken.source();
      try {
        const get = async () => {
          const { data } = await axios.get(
            this._generateURL("taxonomy_term/category")
          );

          setCategories(
            data.data.map(category => ({
              value: category.id,
              label: category.attributes.name
            }))
          );
        };

        get();
      } catch (error) {
        setCategories("error");
        Sentry.withScope(scope => {
          scope.setExtras(error.message);
          Sentry.captureException(error);
        });
      }

      return () => source.cancel();
    }, []);

    return categories;
  }

  getUsers() {
    const [users, setUsers] = useState(null);
    useEffect(() => {
      const cancelToken = axios.CancelToken;
      const source = cancelToken.source();
      try {
        const get = async () => {
          const { data } = await axios.get(this._generateURL("user/user"));
          setUsers(
            data.data.map(u => ({
              value: u.id,
              label: u.attributes.field_full_name || "Anonymous"
            }))
          );
        };

        get();
      } catch (error) {
        setUsers("error");
        Sentry.withScope(scope => {
          scope.setExtras(error.message);
          Sentry.captureException(error);
        });
      }

      return () => source.cancel();
    }, []);

    return users;
  }

  async createSession(values) {
    try {
      const data = this._generateSubmitData(values);
      const { data: session } = await axios.post(
        this._generateURL("node/session"),
        data,
        {
          headers: {
            Accept: "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
            Authorization: window.localStorage.getItem("token")
          }
        }
      );
      return { id: session.data.id, error: false };
    } catch (error) {
      Sentry.withScope(scope => {
        scope.setExtras(error.message);
        Sentry.captureException(error);
      });
      return { id: false, error: true };
    }
  }

  async updateSession(values, id) {
    try {
      const data = this._generateSubmitData(values, id);
      const { data: session } = await axios.patch(
        this._generateURL("node/session/" + id),
        data,
        {
          headers: {
            Accept: "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
            Authorization: window.localStorage.getItem("token")
          }
        }
      );
      return { id: session.data.id, error: false };
    } catch (error) {
      Sentry.withScope(scope => {
        scope.setExtras(error.message);
        Sentry.captureException(error);
      });
      return { id: false, error: true };
    }
  }

  async deleteSession(id) {
    try {
      const token = window.localStorage.getItem("token");
      await Axios.delete(this._generateURL(`node/session/${id}`), {
        headers: {
          Authorization: token
        }
      });

      return { error: false, success: true };
    } catch (error) {
      Sentry.withScope(scope => {
        scope.setExtras(error.message);
        Sentry.captureException(error);
      });
      return { error: true, success: false };
    }
  }

  _generateURL(subpath = "", include = false) {
    let queryParams = "";
    if (include) {
      queryParams = `?include=field_speakers,field_speakers.user_picture,field_category&sort=-created`;
    }
    return `${this.baseURL}/${subpath}${queryParams}`;
  }

  _generateSubmitData(values, id) {
    const data = {
      data: {
        type: "node--session",
        attributes: {
          title: values.title,
          body: {
            value: values.body,
            format: "full_html"
          },
          field_length: Number(values.slength),
          field_room: values.room,
          field_date: `${values.date}T${values.time}+00:00`
        },
        relationships: {
          field_category: {
            data: {
              type: "taxonomy_term--category",
              id: values.category
            }
          },
          field_speakers: {
            data:
              values.speakers &&
              values.speakers.map(speaker => ({
                type: "user--user",
                id: speaker.value
              }))
          }
        }
      }
    };

    if (id) {
      data.data.id = id;
      return data;
    }

    return data;
  }
}
const API = new APIFactory();

export { API };
