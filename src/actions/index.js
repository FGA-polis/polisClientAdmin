import $ from "jquery";

/* ======= Types ======= */
export const REQUEST_USER = "REQUEST_USER";
export const RECEIVE_USER = "RECEIVE_USER";
export const USER_FETCH_ERROR = "USER_FETCH_ERROR";

export const CREATE_NEW_CONVERSATION = "CREATE_NEW_CONVERSATION";
export const CREATE_NEW_CONVERSATION_SUCCESS = "CREATE_NEW_CONVERSATION_SUCCESS";
export const CREATE_NEW_CONVERSATION_ERROR = "CREATE_NEW_CONVERSATION_ERROR";

export const REQUEST_CONVERSATIONS = "REQUEST_CONVERSATIONS";
export const RECEIVE_CONVERSATIONS = "RECEIVE_CONVERSATIONS";
export const CONVERSATIONS_FETCH_ERROR = "CONVERSATIONS_FETCH_ERROR";

/* zid for clarity - this is conversation config */
export const REQUEST_ZID_METADATA = "REQUEST_ZID_METADATA";
export const RECEIVE_ZID_METADATA = "RECEIVE_ZID_METADATA";
export const ZID_METADATA_FETCH_ERROR = "ZID_METADATA_FETCH_ERROR"
export const ZID_METADATA_RESET = "ZID_METADATA_RESET";

export const UPDATE_ZID_METADATA_STARTED = "UPDATE_ZID_METADATA_STARTED";
export const UPDATE_ZID_METADATA_SUCCESS = "UPDATE_ZID_METADATA_SUCCESS";
export const UPDATE_ZID_METADATA_ERROR = "UPDATE_ZID_METADATA_ERROR";

export const OPTIMISTIC_ZID_METADATA_UPDATE = "OPTIMISTIC_ZID_METADATA_UPDATE";

/* moderation */
export const REQUEST_UNMODERATED_COMMENTS = "REQUEST_UNMODERATED_COMMENTS";
export const RECEIVE_UNMODERATED_COMMENTS = "RECEIVE_UNMODERATED_COMMENTS";
export const UNMODERATED_COMMENTS_FETCH_ERROR = "UNMODERATED_COMMENTS_FETCH_ERROR";

export const REQUEST_ACCEPTED_COMMENTS = "REQUEST_ACCEPTED_COMMENTS";
export const RECEIVE_ACCEPTED_COMMENTS = "RECEIVE_ACCEPTED_COMMENTS";
export const ACCEPTED_COMMENTS_FETCH_ERROR = "ACCEPTED_COMMENTS_FETCH_ERROR";

export const REQUEST_REJECTED_COMMENTS = "REQUEST_REJECTED_COMMENTS";
export const RECEIVE_REJECTED_COMMENTS = "RECEIVE_REJECTED_COMMENTS";
export const REJECTED_COMMENTS_FETCH_ERROR = "REJECTED_COMMENTS_FETCH_ERROR";

export const ACCEPT_COMMENT = "ACCEPT_COMMENT";
export const ACCEPT_COMMENT_SUCCESS = "ACCEPT_COMMENT_SUCCESS";
export const ACCEPT_COMMENT_ERROR = "ACCEPT_COMMENT_ERROR";

export const REJECT_COMMENT = "REJECT_COMMENT";
export const REJECT_COMMENT_SUCCESS = "REJECT_COMMENT_SUCCESS";
export const REJECT_COMMENT_ERROR = "REJECT_COMMENT_ERROR";

export const REQUEST_DEFAULT_PARTICIPANTS = "REQUEST_DEFAULT_PARTICIPANTS";
export const RECEIVE_DEFAULT_PARTICIPANTS = "RECEIVE_DEFAULT_PARTICIPANTS";
export const DEFAULT_PARTICIPANTS_FETCH_ERROR = "DEFAULT_PARTICIPANTS_FETCH_ERROR";

export const REQUEST_FEATURED_PARTICIPANTS = "REQUEST_FEATURED_PARTICIPANTS";
export const RECEIVE_FEATURED_PARTICIPANTS = "RECEIVE_FEATURED_PARTICIPANTS";
export const FEATURED_PARTICIPANTS_FETCH_ERROR = "FEATURED_PARTICIPANTS_FETCH_ERROR";

export const REQUEST_HIDDEN_PARTICIPANTS = "REQUEST_HIDDEN_PARTICIPANTS";
export const RECEIVE_HIDDEN_PARTICIPANTS = "RECEIVE_HIDDEN_PARTICIPANTS";
export const HIDDEN_PARTICIPANTS_FETCH_ERROR = "HIDDEN_PARTICIPANTS_FETCH_ERROR";

/* participant actions */
export const FEATURE_PARTICIPANT = "FEATURE_PARTICIPANT";
export const FEATURE_PARTICIPANT_SUCCESS = "FEATURE_PARTICIPANT_SUCCESS";
export const FEATURE_PARTICIPANT_ERROR = "FEATURE_PARTICIPANT_ERROR";

export const HIDE_PARTICIPANT = "HIDE_PARTICIPANT";
export const HIDE_PARTICIPANT_SUCCESS = "HIDE_PARTICIPANT_SUCCESS";
export const HIDE_PARTICIPANT_ERROR = "HIDE_PARTICIPANT_ERROR";

/* submit seed comment */
export const SUBMIT_SEED_COMMENT = "SUBMIT_SEED_COMMENT";
export const SUBMIT_SEED_COMMENT_SUCCESS = "SUBMIT_SEED_COMMENT_SUCCESS";
export const SUBMIT_SEED_COMMENT_ERROR = "SUBMIT_SEED_COMMENT_ERROR";

export const REQUEST_SEED_COMMENTS = "REQUEST_SEED_COMMENTS";
export const RECEIVE_SEED_COMMENTS = "RECEIVE_SEED_COMMENTS";
export const SEED_COMMENTS_FETCH_ERROR = "SEED_COMMENTS_FETCH_ERROR";

/* conversation stats */
export const REQUEST_CONVERSATION_STATS = "REQUEST_CONVERSATION_STATS";
export const RECEIVE_CONVERSATION_STATS = "RECEIVE_CONVERSATION_STATS";
export const CONVERSATION_STATS_FETCH_ERROR = "CONVERSATION_STATS_FETCH_ERROR";

export const DATA_EXPORT_STARTED = "DATA_EXPORT_STARTED";
export const DATA_EXPORT_SUCCESS = "DATA_EXPORT_SUCCESS";
export const DATA_EXPORT_ERROR = "DATA_EXPORT_ERROR";

export const SIGNIN_INITIATED = "SIGNIN_INITIATED";
// export const SIGNIN_SUCCESSFUL = "SIGNIN_SUCCESSFUL";
export const SIGNIN_ERROR = "SIGNIN_ERROR";

export const SIGNOUT_INITIATED = "SIGNOUT_INITIATED";
export const SIGNOUT_SUCCESSFUL = "SIGNOUT_SUCCESSFUL";
export const SIGNOUT_ERROR = "SIGNOUT_ERROR";

export const PWRESET_INIT_INITIATED = "PWRESET_INIT_INITIATED";
export const PWRESET_INIT_SUCCESS = "PWRESET_INIT_SUCCESS";
export const PWRESET_INIT_ERROR = "PWRESET_INIT_ERROR";

export const PWRESET_INITIATED = "PWRESET_INITIATED";
export const PWRESET_SUCCESS = "PWRESET_SUCCESS";
export const PWRESET_ERROR = "PWRESET_ERROR";

export const FACEBOOK_SIGNIN_INITIATED = "FACEBOOK_SIGNIN_INITIATED";
export const FACEBOOK_SIGNIN_SUCCESSFUL = "FACEBOOK_SIGNIN_SUCCESSFUL";
export const FACEBOOK_SIGNIN_FAILED = "FACEBOOK_SIGNIN_FAILED";


/* ======= Actions ======= */

/*

  populate is the function the component calls
  fetch is the api call itself
  request tells everyone we're loading
  receive proxies the data to the store

*/

/* User */

const requestUser = () => {
  return {
    type: REQUEST_USER
  };
};

const receiveUser = (data) => {
  return {
    type: RECEIVE_USER,
    data: data
  };
};

const userFetchError = (err) => {
  return {
    type: USER_FETCH_ERROR,
    status: err.status,
    data: err
  }
}

const fetchUser = () => {
  return $.get('/api/v3/users?errIfNoAuth=true');
}

export const populateUserStore = () => {
  return (dispatch) => {
    dispatch(requestUser())
    return fetchUser().then(
      res => dispatch(receiveUser(res)),
      err => dispatch(userFetchError(err))
    )
  }
}


/* signin */

const signinInitiated = () => {
  return {
    type: SIGNIN_INITIATED
  };
};

// SIGNIN_SUCCESSFUL Not needed since redirecting to clear password from memory

const signinError = (err) => {
  return {
    type: SIGNIN_ERROR,
    data: err
  }
}

const signinPost = (attrs) => {
  return $.ajax({
    url:  "/api/v3/auth/login",
    type: "POST",
    dataType: "json",
    xhrFields: {
      withCredentials: true
    },
    // crossDomain: true,
    data: attrs
  });
}

export const doSignin = (attrs, dest) => {
  return (dispatch) => {
    console.log(attrs)
    dispatch(signinInitiated())
    return signinPost(attrs).then(
      () => {
        setTimeout(() => {
          // Force page to load so we can be sure the password is cleared from memory
          // delay a bit so the cookie has time to set
          window.location = dest||"";
        }, 3000);
      },
      err => dispatch(signinError(err))
    )
  }
}

/* passwordResetInit */

const passwordResetInitInitiated = () => {
  return {
    type: PWRESET_INIT_INITIATED
  };
};

const passwordResetInitSuccess = () => {
  return {
    type: PWRESET_INIT_SUCCESS
  };
};

const passwordResetInitError = (err) => {
  return {
    type: PWRESET_INIT_ERROR,
    data: err
  }
}

const passwordResetInitPost = (attrs) => {
  return $.ajax({
    url:  "/api/v3/auth/pwresettoken",
    type: "POST",
    dataType: "json",
    xhrFields: {
      withCredentials: true
    },
    // crossDomain: true,
    data: attrs
  });
}

export const doPasswordResetInit = (attrs) => {
  return (dispatch) => {
    dispatch(passwordResetInitInitiated())
    return passwordResetInitPost(attrs).then(
      () => {
        setTimeout(() => {
          // Force page to load so we can be sure the password is cleared from memory
          // delay a bit so the cookie has time to set
          window.location = "/pwresetinit/done";
        }, 3000);

        return dispatch(passwordResetInitSuccess());
      },
      err => dispatch(passwordResetInitError(err))
    )
  }
}

/* passwordReset */

const passwordResetInitiated = () => {
  return {
    type: PWRESET_INITIATED
  };
};

const passwordResetSuccess = () => {
  return {
    type: PWRESET_SUCCESS
  };
};

const passwordResetError = (err) => {
  return {
    type: PWRESET_ERROR,
    data: err
  }
}

const passwordResetPost = (attrs) => {
  return $.ajax({
    url:  "/api/v3/auth/password",
    type: "POST",
    dataType: "json",
    xhrFields: {
      withCredentials: true
    },
    // crossDomain: true,
    data: attrs
  });
}

export const doPasswordReset = (attrs) => {
  return (dispatch) => {
    dispatch(passwordResetInitiated())
    return passwordResetPost(attrs).then(
      () => {
        setTimeout(() => {
          // Force page to load so we can be sure the password is cleared from memory
          // delay a bit so the cookie has time to set
          window.location = "/";
        }, 3000);

        return dispatch(passwordResetSuccess());
      },
      err => dispatch(passwordResetError(err))
    )
  }
}

/* facebook */

const facebookSigninInitiated = () => {
  return {
    type: FACEBOOK_SIGNIN_INITIATED
  }
}

const facebookSigninSuccessful = () => {
  return {
    type: FACEBOOK_SIGNIN_SUCCESSFUL
  }
}

const facebookSigninFailed = () => {
  return {
    type: FACEBOOK_SIGNIN_FAILED
  }
}

const getFriends = () => {
  var dfd = $.Deferred();

  function getMoreFriends(friendsSoFar, urlForNextCall) {
    console.log("getMoreFriends");

    return $.get(urlForNextCall).then(function(response) {
      if (response.data.length) {
        for (var i = 0; i < response.data.length; i++) {
          friendsSoFar.push(response.data[i]);
        }
        if (response.paging.next) {
          return getMoreFriends(friendsSoFar, response.paging.next);
        }
        return friendsSoFar;
      } else {
        return friendsSoFar;
      }
    });
  }

  FB.api('/me/friends',function (response) {
    console.log("/me/friends returned");
    if (response && !response.error) {

      var friendsSoFar = response.data;
      if (response.data.length && response.paging.next) {
        getMoreFriends(friendsSoFar, response.paging.next).then(
          dfd.resolve,
          dfd.reject);
      } else {
        dfd.resolve(friendsSoFar || []);
      }
    } else {
      // 'failed to find friends'
      dfd.reject(response);
    }
  });
  return dfd.promise();
}

const getInfo = () => {
  var dfd = $.Deferred();

  FB.api('/me', (response) => {
    console.log("/me done");
    // {"id":"10152802017421079"
    //   "email":"michael@bjorkegren.com"
    //   "first_name":"Mike"
    //   "gender":"male"
    //   "last_name":"Bjorkegren"
    //   "link":"https://www.facebook.com/app_scoped_user_id/10152802017421079/"
    //   "locale":"en_US"
    //   "location": {
    //      "id": "110843418940484",  ------------> we can make another call to get the lat,lng for this
    //      "name": "Seattle, Washington"
    //   },
    //   "name":"Mike Bjorkegren"
    //   "timezone":-7
    //   "updated_time":"2014-07-03T06:38:02+0000"
    //   "verified":true}

    if (response && !response.error) {
      if (response.location && response.location.id) {
        FB.api('/' + response.location.id, (locationResponse) => {
          console.log("locationResponse");
          console.dir(locationResponse);
          if (locationResponse) {
            response.locationInfo = locationResponse;
          }
          dfd.resolve(response);
        });
      } else {
        dfd.resolve(response);
      }
    } else {
      // alert('failed to find data');
      dfd.reject(response);
    }
  });
  return dfd.promise();
}

const saveFacebookFriendsData = (data) => {
  $.ajax({
    url: "/api/v3/auth/facebook",
    contentType: "application/json; charset=utf-8",
    headers: {
      "Cache-Control": "max-age=0"
    },
    xhrFields: {
        withCredentials: true
    },
    dataType: "json",
    data: JSON.stringify(data),
    type: "POST"
  }).then(() => {
    // colin writes fire signin?
    // that.trigger("authenticated");
    gaEvent("Session", "create", "signIn");
  }, (err) => {
    console.dir(err);

    if ( err.responseText && /polis_err_user_with_this_email_exists/.test(err.responseText) ) {

      console.log('thats a user already enter your password')
      // Todo handle

      // var password = prompt("A pol.is user "+data.fb_email+", the same email address as associted with your facebook account, already exists. Enter your pol.is password to enable facebook login for your pol.is account.");
      // that.linkMode = true;

      // that.model.set({
      //   create: false, // don't show create account stuff, account exists.
      //   linkMode: true,
      //   email: data.fb_email,
      // });
    } else {
      alert("error logging in with Facebook");
    }
  });
}

const processFacebookFriendsData = (respose) => {

  return (fb_public_profile, friendsData) => {
    // alert(JSON.stringify(friendsData));
    console.log("got info and friends");

    var data = {
      fb_public_profile: JSON.stringify(fb_public_profile),
      fb_friends_response: JSON.stringify(friendsData),
      response: JSON.stringify(response)
    };

    if (fb_public_profile.email) {
      data.fb_email = fb_public_profile.email;
    } else {
      data.provided_email = prompt("Please enter your email address.");
    }

    var hname = [
      fb_public_profile.first_name,
      fb_public_profile.last_name
    ].join(" ");

    if (hname.length) {
      data.hname = hname;
    }

    if (response && response.authResponse && response.authResponse.grantedScopes) {
      data.fb_granted_scopes = response.authResponse.grantedScopes;
    }

    if (optionalPassword) {
      data.password = optionalPassword;
    }

    saveFacebookFriendsData(data)
  }

}

const onFbLoginOk = (response, optionalPassword) => {

  console.log("onFbLoginOk");
  console.dir(response);

  $.when(
    getInfo(),
    getFriends()
  ).then(
    processFacebookFriendsData(response),
    (err) => {
      console.error(err);
      console.dir(arguments);
    }
  );
}

const callFacebookLoginAPI = () => {
  console.log("ringing facebook...");
  const password = "THIS_STRING_SHOULD_NOT_BE_HERE"

  FB.login((res) =>  {
      return onFbLoginOk(res);
    }, {
      return_scopes: true, // response should contain the scopes the user allowed
      scope: [
        // 'taggable_friends', // requires review.
        // invitable_friends NOTE: only for games with a fb Canvas presence, so don't use this
        'public_profile',
        'user_friends',
        'email'
      ].join(',')
    });
}

export const doFacebookSignin = (dest) => {
  return (dispatch) => {
    dispatch(facebookSigninInitiated())
    console.log('facebook sign in initiated', dest)
    return callFacebookLoginAPI()
  }
}

/* signout */

const signoutInitiated = () => {
  return {
    type: SIGNOUT_INITIATED
  };
};

// SIGNOUT_SUCCESSFUL Not needed since redirecting to clear old user's state from memory

const signoutError = (err) => {
  return {
    type: SIGNOUT_ERROR,
    data: err
  }
}

const signoutPost = (dest) => {
  // relying on server to clear cookies
  return $.ajax({
    type: "POST",
    url: "/api/v3/auth/deregister",
    data: {},
    dataType: "text", // server returns an empty response, so can't parse as JSON
    });
}

export const doSignout = (dest) => {
  return (dispatch) => {
    dispatch(signoutInitiated());
    return signoutPost().then(
      res => {
        setTimeout(() => {
          // Force page to load so we can be sure the old user's state is cleared from memory
          // delay a bit so the cookies have time to clear too.
          window.location = dest || "/about";
        }, 1000);
      },
      err => dispatch(signoutError(err))
    )
  }
}

/* Conversations */

const requestConversations = () => {
  return {
    type: REQUEST_CONVERSATIONS
  };
};

const receiveConversations = (data) => {
  return {
    type: RECEIVE_CONVERSATIONS,
    data: data
  };
};

const conversationsError = (err) => {
  return {
    type: CONVERSATIONS_FETCH_ERROR,
    data: err
  }
}

const fetchConversations = () => {
  return $.get('/api/v3/conversations');
}

export const populateConversationsStore = () => {
  return (dispatch) => {
    dispatch(requestConversations())
    return fetchConversations().then(
      res => dispatch(receiveConversations(res)),
      err => dispatch(conversationsError(err))
    )
  }
}

/* zid metadata */

const requestZidMetadata = (conversation_id) => {
  return {
    type: REQUEST_ZID_METADATA,
    data: {
      conversation_id: conversation_id
    }
  };
};

const receiveZidMetadata = (data) => {
  return {
    type: RECEIVE_ZID_METADATA,
    data: data
  };
};

const zidMetadataFetchError = (err) => {
  return {
    type: ZID_METADATA_FETCH_ERROR,
    data: err
  }
}

export const resetMetadataStore = () => {
  return {
    type: ZID_METADATA_RESET
  }
}

const fetchZidMetadata = (conversation_id) => {
  return $.get('/api/v3/conversations?conversation_id=' + conversation_id);
}

export const populateZidMetadataStore = (conversation_id) => {
  return (dispatch, getState) => {

    var state = getState();
    var hasConversationId = state.zid_metadata &&
      state.zid_metadata.zid_metadata &&
      state.zid_metadata.zid_metadata.conversation_id;

    var isLoading = state.zid_metadata.loading;
    // NOTE: if there are multiple calls outstanding this may be wrong.
    var isLoadingThisConversation = (state.zid_metadata.conversation_id == conversation_id) && isLoading;


    if (isLoadingThisConversation) {
      return;
    }

    // don't fetch again if we already have data loaded for that conversation.
    if (hasConversationId && state.zid_metadata.zid_metadata.conversation_id == conversation_id) {
      return;
    }

    dispatch(requestZidMetadata(conversation_id))
    return fetchZidMetadata(conversation_id).then(
      res => dispatch(receiveZidMetadata(res)),
      err => dispatch(zidMetadataFetchError(err))
    );
  }
}

/* zid metadata update */

const updateZidMetadataStarted = () => {
  return {
    type: UPDATE_ZID_METADATA_STARTED
  }
}

const updateZidMetadataSuccess = (data) => {
  return {
    type: UPDATE_ZID_METADATA_SUCCESS,
    data: data
  }
}

const updateZidMetadataError = (err) => {
  return {
    type: UPDATE_ZID_METADATA_ERROR,
    data: err
  }
}

const updateZidMetadata = (zm, field, value) => {
  let data = {};
  data[field] = value;
  return $.ajax({
    url: "/api/v3/conversations",
    method: "PUT",
    contentType: "application/json; charset=utf-8",
    headers: { "Cache-Control": "max-age=0" },
    xhrFields: { withCredentials: true },
    dataType: "json",
    data: JSON.stringify(Object.assign({}, zm, data))
  })
}

export const handleZidMetadataUpdate = (zm, field, value) => {
  return (dispatch) => {
    dispatch(updateZidMetadataStarted())
    return updateZidMetadata(zm, field, value)
      .then(res => dispatch(updateZidMetadataSuccess(res)))
      .fail(err => dispatch(updateZidMetadataError(err)))
  }
}

export const optimisticZidMetadataUpdateOnTyping = (zm, field, value) => {
  zm[field] = value
  return {
    type: OPTIMISTIC_ZID_METADATA_UPDATE,
    data: zm
  }
}

/* seed comments submit */

const submitSeedCommentStart = () => {
  return {
    type: SUBMIT_SEED_COMMENT
  }
}

const submitSeedCommentPostSuccess = () => {
  return {
    type: SUBMIT_SEED_COMMENT_SUCCESS
  }
}

const submitSeedCommentPostError = () => {
  return {
    type: SUBMIT_SEED_COMMENT_ERROR
  }
}

const postSeedComment = (comment) => {
  return $.ajax({
    method: "POST",
    url: "/api/v3/comments",
    data: comment
  })
}

export const handleSeedCommentSubmit = (comment) => {
  return (dispatch) => {
    dispatch(submitSeedCommentStart())
    return postSeedComment(comment).then(
      res => dispatch(submitSeedCommentPostSuccess(res)),
      err => dispatch(submitSeedCommentPostError(err))
    ).then(dispatch(populateAllCommentStores(comment.conversation_id)))
  }
}

/* seed comments fetch */

// const requestSeedComments = () => {
//   return {
//     type: REQUEST_SEED_COMMENTS,
//   };
// };

// const receiveSeedComments = (data) => {
//   return {
//     type: RECEIVE_SEED_COMMENTS,
//     data: data
//   };
// };

// const seedCommentsFetchError = (err) => {
//   return {
//     type: SEED_COMMENTS_FETCH_ERROR,
//     data: err
//   }
// }

// const fetchSeedComments = (conversation_id) => {
//   return $.get('/api/v3/comments?moderation=true&mod=0&conversation_id=' + conversation_id);
// }

// export const populateSeedCommentStore = (conversation_id) => {
//   return (dispatch) => {
//     dispatch(requestSeedComments())
//     return fetchSeedComments(conversation_id).then(
//       res => dispatch(receiveSeedComments(res)),
//       err => dispatch(seedCommentsFetchError(err))
//     )
//   }
// }



/* create conversation */

const createConversationStart = () => {
  return {
    type: CREATE_NEW_CONVERSATION
  }
}

const createConversationPostSuccess = (res) => {
  return {
    type: CREATE_NEW_CONVERSATION_SUCCESS,
    data: res,
  }
}

const createConversationPostError = (err) => {
  return {
    type: CREATE_NEW_CONVERSATION_ERROR,
    data: err,
  }
}

const postCreateConversation = () => {
  return $.ajax({
    method: "POST",
    url: "/api/v3/conversations",
    data: {
      is_draft: true,
      is_active: true,
    }
  })
}

export const handleCreateConversationSubmit = (routeTo) => {
  return (dispatch, getState) => {
    dispatch(createConversationStart())
    return postCreateConversation().then(
      function(res) {
        dispatch(createConversationPostSuccess(res));
        return res;
      },
      err => dispatch(createConversationPostError(err))
    ).then(function(res) {
      window.location = "/m/" + res.conversation_id;
    });
  };
}




/* unmoderated comments */

const requestUnmoderatedComments = () => {
  return {
    type: REQUEST_UNMODERATED_COMMENTS,
  };
};

const receiveUnmoderatedComments = (data) => {
  return {
    type: RECEIVE_UNMODERATED_COMMENTS,
    data: data
  };
};

const unmoderatedCommentsFetchError = (err) => {
  return {
    type: UNMODERATED_COMMENTS_FETCH_ERROR,
    data: err
  }
}

const fetchUnmoderatedComments = (conversation_id) => {
  return $.get('/api/v3/comments?moderation=true&mod=0&conversation_id=' + conversation_id);
}

export const populateUnmoderatedCommentsStore = (conversation_id) => {
  return (dispatch) => {
    dispatch(requestUnmoderatedComments())
    return fetchUnmoderatedComments(conversation_id).then(
      res => dispatch(receiveUnmoderatedComments(res)),
      err => dispatch(unmoderatedCommentsFetchError(err))
    )
  }
}

/* accepted comments */

const requestAcceptedComments = () => {
  return {
    type: REQUEST_ACCEPTED_COMMENTS,
  };
};

const receiveAcceptedComments = (data) => {
  return {
    type: RECEIVE_ACCEPTED_COMMENTS,
    data: data
  };
};

const acceptedCommentsFetchError = (err) => {
  return {
    type: ACCEPTED_COMMENTS_FETCH_ERROR,
    data: err
  }
}

const fetchAcceptedComments = (conversation_id) => {
  return $.get('/api/v3/comments?moderation=true&mod=1&conversation_id=' + conversation_id);
}

export const populateAcceptedCommentsStore = (conversation_id) => {
  return (dispatch) => {
    dispatch(requestAcceptedComments())
    return fetchAcceptedComments(conversation_id).then(
      res => dispatch(receiveAcceptedComments(res)),
      err => dispatch(acceptedCommentsFetchError(err))
    )
  }
}

/* rejected comments */

const requestRejectedComments = () => {
  return {
    type: REQUEST_REJECTED_COMMENTS,
  };
};

const receiveRejectedComments = (data) => {
  return {
    type: RECEIVE_REJECTED_COMMENTS,
    data: data
  };
};

const rejectedCommentsFetchError = (err) => {
  return {
    type: REJECTED_COMMENTS_FETCH_ERROR,
    data: err
  }
}

const fetchRejectedComments = (conversation_id) => {
  return $.get('/api/v3/comments?moderation=true&mod=-1&conversation_id=' + conversation_id);
}

export const populateRejectedCommentsStore = (conversation_id) => {
  return (dispatch) => {
    dispatch(requestRejectedComments())
    return fetchRejectedComments(conversation_id).then(
      res => dispatch(receiveRejectedComments(res)),
      err => dispatch(rejectedCommentsFetchError(err))
    )
  }
}

/* populate ALL stores todo/accept/reject/seed */

export const populateAllCommentStores = (conversation_id) => {
  return (dispatch) => {
    return $.when(
      dispatch(populateUnmoderatedCommentsStore(conversation_id)),
      dispatch(populateAcceptedCommentsStore(conversation_id)),
      dispatch(populateRejectedCommentsStore(conversation_id))
    )
  }
}

// export const populateAllCommentStores = (conversation) => {
// }

/* moderator clicked accept comment */

const optimisticCommentAccepted = (comment) => {
  return {
    type: ACCEPT_COMMENT,
    comment: comment
  }
}

const acceptCommentSuccess = (data) => {
  return {
    type: ACCEPT_COMMENT_SUCCESS,
    data: data
  }
}

const acceptCommentError = (err) => {
  return {
    type: ACCEPT_COMMENT_ERROR,
    data: err
  }
}

const putCommentAccepted = (comment) => {
  return $.ajax({
    method: "PUT",
    url: "/api/v3/comments",
    data: Object.assign(comment, {mod: 1})
  })
}

export const changeCommentStatusToAccepted = (comment) => {
  return (dispatch) => {
    dispatch(optimisticCommentAccepted(comment))
    return putCommentAccepted(comment).then(
      res => dispatch(acceptCommentSuccess(res)),
      err => dispatch(acceptCommentError(err))
    )
  }
}

/* moderator clicked reject comment */

const optimisticCommentRejected = (comment) => {
  return {
    type: REJECT_COMMENT,
    comment: comment
  }
}

const rejectCommentSuccess = (data) => {
  return {
    type: REJECT_COMMENT_SUCCESS,
    data: data
  }
}

const rejectCommentError = (err) => {
  return {
    type: REJECT_COMMENT_ERROR,
    data: err
  }
}

const putCommentRejected = (comment) => {

  return $.ajax({
    method: "PUT",
    url: "/api/v3/comments",
    data: Object.assign(comment, {mod: -1})
  })
}

export const changeCommentStatusToRejected = (comment) => {
  return (dispatch) => {
    dispatch(optimisticCommentRejected())
    return putCommentRejected(comment).then(
      (res) => {
        dispatch(rejectCommentSuccess(res));
      },
      err => dispatch(rejectCommentError(err))
    )
  }
}

/* request default participants for ptpt moderation view */

const requestDefaultParticipants = () => {
  return {
    type: REQUEST_DEFAULT_PARTICIPANTS,
  };
};

const receiveDefaultParticipants = (data) => {
  return {
    type: RECEIVE_DEFAULT_PARTICIPANTS,
    data: data
  };
};

const defaultParticipantFetchError = (err) => {
  return {
    type: DEFAULT_PARTICIPANTS_FETCH_ERROR,
    data: err
  }
}

const fetchDefaultParticipants = (conversation_id) => {
  return $.get('/api/v3/ptptois?mod=0&conversation_id=' + conversation_id);
}

export const populateDefaultParticipantStore = (conversation_id) => {
  return (dispatch) => {
    dispatch(requestDefaultParticipants())
    return fetchDefaultParticipants(conversation_id).then(
      res => dispatch(receiveDefaultParticipants(res)),
      err => dispatch(defaultParticipantFetchError(err))
    )
  }
}

/* request featured participants for ptpt moderation view */

const requestFeaturedParticipants = () => {
  return {
    type: REQUEST_FEATURED_PARTICIPANTS,
  };
};

const receiveFeaturedParticipants = (data) => {
  return {
    type: RECEIVE_FEATURED_PARTICIPANTS,
    data: data
  };
};

const featuredParticipantFetchError = (err) => {
  return {
    type: FEATURED_PARTICIPANTS_FETCH_ERROR,
    data: err
  }
}

const fetchFeaturedParticipants = (conversation_id) => {
  return $.get('/api/v3/ptptois?mod=1&conversation_id=' + conversation_id);
}

export const populateFeaturedParticipantStore = (conversation_id) => {
  return (dispatch) => {
    dispatch(requestFeaturedParticipants())
    return fetchFeaturedParticipants(conversation_id).then(
      res => dispatch(receiveFeaturedParticipants(res)),
      err => dispatch(featuredParticipantFetchError(err))
    )
  }
}

/* request hidden participants for ptpt moderation view */

const requestHiddenParticipants = () => {
  return {
    type: REQUEST_HIDDEN_PARTICIPANTS,
  };
};

const receiveHiddenParticipants = (data) => {
  return {
    type: RECEIVE_HIDDEN_PARTICIPANTS,
    data: data
  };
};

const hiddenParticipantFetchError = (err) => {
  return {
    type: HIDDEN_PARTICIPANTS_FETCH_ERROR,
    data: err
  }
}

const fetchHiddenParticipants = (conversation_id) => {
  return $.get('/api/v3/ptptois?mod=-1&conversation_id=' + conversation_id);
}

export const populateHiddenParticipantStore = (conversation_id) => {
  return (dispatch) => {
    dispatch(requestHiddenParticipants())
    return fetchHiddenParticipants(conversation_id).then(
      res => dispatch(receiveHiddenParticipants(res)),
      err => dispatch(hiddenParticipantFetchError(err))
    )
  }
}

/* populate ALL stores todo/accept/reject/seed */

export const populateAllParticipantStores = (conversation_id) => {
  return (dispatch) => {
    return $.when(
      dispatch(populateDefaultParticipantStore(conversation_id)),
      dispatch(populateFeaturedParticipantStore(conversation_id)),
      dispatch(populateHiddenParticipantStore(conversation_id))
    )
  }
}


/* moderator clicked feature ptpt */

const optimisticFeatureParticipant = (participant) => {
  return {
    type: FEATURE_PARTICIPANT,
    participant: participant
  }
}

const featureParticipantSuccess = (data) => {
  return {
    type: FEATURE_PARTICIPANT_SUCCESS,
    data: data
  }
}

const featureParticipantError = (err) => {
  return {
    type: FEATURE_PARTICIPANT_ERROR,
    data: err
  }
}

const putFeatureParticipant = (participant) => {
  return $.ajax({
    method: "PUT",
    url: "/api/v3/ptptois",
    data: Object.assign(participant, {mod: 1})
  })
}

export const changeParticipantStatusToFeatured = (participant) => {
  return (dispatch) => {
    dispatch(optimisticFeatureParticipant(participant))
    return putFeatureParticipant(participant).then(
      res => dispatch(featureParticipantSuccess(res)),
      err => dispatch(featureParticipantError(err))
    )
  }
}
/* moderator clicked hide ptpt */

const optimisticHideParticipant = (participant) => {
  return {
    type: FEATURE_PARTICIPANT,
    participant: participant
  }
}

const hideParticipantSuccess = (data) => {
  return {
    type: FEATURE_PARTICIPANT_SUCCESS,
    data: data
  }
}

const hideParticipantError = (err) => {
  return {
    type: FEATURE_PARTICIPANT_ERROR,
    data: err
  }
}

const putHideParticipant = (participant) => {
  return $.ajax({
    method: "PUT",
    url: "/api/v3/ptptois",
    data: Object.assign(participant, {mod: -1})
  })
}

export const changeParticipantStatusToHidden = (participant) => {
  return (dispatch) => {
    dispatch(optimisticHideParticipant(participant))
    return putHideParticipant(participant).then(
      res => dispatch(hideParticipantSuccess(res)),
      err => dispatch(hideParticipantError(err))
    )
  }
}
/* request conversation stats */

const requestConversationStats = () => {
  return {
    type: REQUEST_CONVERSATION_STATS,
  };
};

const receiveConversationStats = (data) => {
  return {
    type: RECEIVE_CONVERSATION_STATS,
    data: data
  };
};

const conversationStatsFetchError = (err) => {
  return {
    type: CONVERSATION_STATS_FETCH_ERROR,
    data: err
  }
}

const fetchConversationStats = (conversation_id) => {
  return $.get('/api/v3/conversationStats?conversation_id=' + conversation_id);
}

export const populateConversationStatsStore = (conversation_id) => {
  return (dispatch) => {
    dispatch(requestConversationStats())
    return fetchConversationStats(conversation_id).then(
      res => dispatch(receiveConversationStats(res)),
      err => dispatch(conversationStatsFetchError(err))
    )
  }
}

/* data export */

const dataExportStarted = () => {
  return {
    type: DATA_EXPORT_STARTED
  };
};

const dataExportSuccess = () => {
  return {
    type: DATA_EXPORT_SUCCESS
  };
};

const dataExportError = () => {
  return {
    type: DATA_EXPORT_ERROR
  };
};

const dataExportGet = (conversation_id, format, unixTimestamp) => {
  //       url += ("&unixTimestamp=" + ((ctx.date/1000) << 0));

  /* https://pol.is/api/v3/dataExport?conversation_id=2arcefpshi&format=csv&unixTimestamp=1447362000 */
  const url = `/api/v3/dataExport?conversation_id=${conversation_id}&format=${format}&unixTimestamp=${unixTimestamp}`
  return $.get(url);
}

export const startDataExport = (conversation_id, format, unixTimestamp) => {
  return (dispatch) => {
    dispatch(dataExportStarted() )
    return dataExportGet(conversation_id, format, unixTimestamp).then(
      res => dispatch(dataExportSuccess(res)),
      err => dispatch(dataExportError(err))
    )
  }
}



