import { API_URL } from "../constants/apiConstants";
import feathers from "@feathersjs/feathers";
import rest from "@feathersjs/rest-client";
import auth from "@feathersjs/authentication-client";
import axios from "axios";

const app = feathers();
const restClient = rest(API_URL);
app.configure(restClient.axios(axios));
app.configure(auth());

export default app;

export const markers = app.service("event");
