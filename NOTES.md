| Non Rest       | Rest               | Action    |
|:---------------|:-------------------|:----------|
|/listAllLessons | /api/lessons       | GET       |
|/createLessons  | /api/lessons       | POST      |
|/deleteLessons  | /api/lessons/:{id} | DELETE    |
|/updateUser     | /api/users/:{id}   | Patch/PUT |

# Problems
- Found no index.js file, so server is not set up to run like the directions indicated it was.
- No express in the package.json so that module was not included, which is the server, so how .. whaa?