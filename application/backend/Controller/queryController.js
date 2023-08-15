const UserInfo = require("../Model/userModel");
const Query = require("../Model/queryModel");
const Schedule = require("../Model/scheduleModel");

/**
 * This returns the user's queries
 * @param {Schema.Types.ObjectId} user_id the user id 
 * @returns {mongoose.Schema.Types.ObjectId} returns the query history of the
 *     user
 */

const getUserQueries = (user_id) => {
  return UserInfo.findById(user_id)
    .then(user => {
      if (!user) {
        throw new Error("User not found");
      }

      return Query.find({ _id: { $in: user.queryHistory } }).then(query => {
        return query;
      });
    })
    .catch(error => {
      return error;
    });
}

const addQuery = (user_id, queryInformation) => {
  return UserInfo.findById(user_id)
    .then(user => {
      if (!user) {
        throw new Error("User not found");
      }
      
      return new Query({
        city: queryInformation.city,
        country: queryInformation.country,
        numberOfSchedules: queryInformation.numberOfSchedules,
        budget: queryInformation.budget,
        partySize: queryInformation.partySize,
        startDate: queryInformation.startDate,
        endDate: queryInformation.endDate,
      })
        .save()
        .then(query => {
          user.queryHistory.push(query);
          user.save();
          return query;
        });
    });
}

const search = (user_id, search) => {
  if (search === '') { // If nothing was input, return nothing and does not add it to the searchHistory array
    throw new Error("Search term is empty");
  }

  return UserInfo.findById( user_id )
    .then((user) => {
      if( user.searchHistory.length >= 10) { // Stops the array from growing larger than 10 search terms
        user.searchHistory.shift(); // Removes the first element within the array. the Oldest one
        user.searchHistory.push(search);
        user.save();
      } else {
        user.searchHistory.push(search);
        user.save();
      }
      // Saves the user's searchHistory into a new variable to send to the front end
      const querySchedules = []; // Creates a new array to hold the searched schedules to send back to the frontend
      return Promise.all(user.schedules.map(async (scheduleId) => { // Async so that we get the schedules first before responding with the data
        const schedule = await Schedule.findById(scheduleId);
        if(schedule.destination.toLocaleLowerCase().includes(search.toLocaleLowerCase())) // Searches whether the destination contains the term
        { 
          querySchedules.push(schedule);
        }
        for(let i = 0; i < schedule.events.length; i++) { // Iterate through each midpoint name the schedule has and match the search term
          if(schedule.events[i].midpoint.name.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().includes(search.toLocaleLowerCase())) // Checks midpoint if search is within
          {
            // To prevent duplicates of the same schedule from being pushed into the array
            if(!querySchedules.includes(schedule)) // Checks to see if that schedule is already within the array
            {
              querySchedules.push(schedule);
            }
          }
        }
      }))
      .then(() => {
        return {user, querySchedules};
      });
    });
}

module.exports = {
  getUserQueries,
  addQuery,
  search,
};