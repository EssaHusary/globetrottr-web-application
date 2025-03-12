# globetrottr-web-application
A web application I worked on with 5 other groupmates. It is similar to TripAdvisor, in which a user can plan trips, get the best routes, and get info on notable landmarks.


# CSC648-spring23-01-team03 Repository

**Application URL: https://www.globetrottr.org**

## Before completing Milestone 0

1. Change the name of the repository to csc648-spring23-SectionName-teamNN.
   - SectionName should be one of 01, 02, 03 or 04.
   - teamNN should be your team number. Team numbers whose value is less than
     10, please pad with a 0 (e.g. team 1 is Team01 team 11 is Team11). Please
     make sure to also **remove the username from the repository as well**!
     Teams with an incorrectly named repository will have points deducted from
     their milestone 0 grades.
   - Examples: `csc648-spring23-04-Team01`, `csc648-spring23-01-Team05`
2. Add ALL members of your team to this repository. For it to count, **they must
   ACCEPT the invite**.
3. Fill out the table below

| Student Name | Student Email | GitHub Username | Student's role |
| :----------: | :-----------: | :-------------: | :------------: |
|   Jay Gupta   | jgupta@sfsu.edu |      jaygupt       |  Team Leader   |
|  Essa Husary | ehusary2@mail.sfsu.edu  | EssaHusary | Scrum Master |
| Devin Kern | dkern@sfsu.edu | DevinLKern | Github Master |
| Justin Wang | jwang48@mail.sfsu.edu | jwang648 | Backend Lead |
| Kevin Liu | cliu18@sfsu.edu | igouProto | Frontend Lead |
| Brandon Khuu | bkhuu@mail.sfsu.edu | b-khuu | Frontend Lead | 

**NO code should be stored in the root of your repository. You may rename the
`application/` folder to your team's application name if you'd like, but all the
source code should be stored inside that folder.**

API Guide:
1. Register for API keys on www.bingmapsportal.com, https://opentripmap.io product, and https://api-ninjas.com/api/geocoding.
2. In the .env file of backend, add the following variables with the values from (1): GEOCODING_API_KEY, OPENTRIPMAP_API_KEY, and BINGMAP_API_KEY.
