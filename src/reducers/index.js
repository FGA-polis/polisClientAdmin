import { combineReducers } from "redux";
import conversations from "./conversations";
import user from "./user";
import zid_metadata from "./zid_metadata";
import mod_comments_accepted from "./mod_comments_accepted";
import mod_comments_rejected from "./mod_comments_rejected";
import mod_comments_unmoderated from "./mod_comments_unmoderated";
import mod_ptpt_default from "./mod_ptpt_default";
import mod_ptpt_featured from "./mod_ptpt_featured";
import mod_ptpt_hidden from "./mod_ptpt_hidden";
import stats from "./stats";
import seed_comments from "./seed_comments";
import signout from "./signout";
import signin from "./signin";

const rootReducer = combineReducers({
  conversations,
  user,
  zid_metadata,
  mod_comments_accepted,
  mod_comments_rejected,
  mod_comments_unmoderated,
  mod_ptpt_default,
  mod_ptpt_featured,
  mod_ptpt_hidden,
  seed_comments,
  stats,
  signout,
  signin
});

export default rootReducer;
