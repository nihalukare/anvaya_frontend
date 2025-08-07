# ClientideOne

ClientideOne is a Customer Relationship Management (CRM) application that helps sales teams manage their leads. It provides a user-friendly interface which enables users to have a detailed view of leads and add new leads. The app also makes it easier for sales agents to collaborate by sharing comments, tracking progress, and viewing reports with useful insights and analytics.

---

## Demo Link

[Live Demo](https://anvaya-frontend-six.vercel.app/)

---

## Quick Start

```
git clone https://github.com/nihalukare/anvaya_frontend.git
cd <your-repo>
npm install
npm run dev
```

---

## Technologies

- React JS
- React Router
- react-chartjs-2
- Node.js
- Express
- MongoDB
- Bootstrap

## Demo Video

Watch a walkthrough of all major features of this application - [Video](https://www.placehold.co)

## Features

### Dashboard

- Display a paginated list of all leads.
- Display distribution of all leads by status.
- Quick Filters to filter out leads by status.
- Add new lead button to create a new lead.

### LeadList

- Display a paginated list of all leads.
- Filters to filter out leads by status, sales agent, leads source, and tags.
- Sorting options to sort leads by priorit(High, Medium and Low) and, Time to Close (nearest first and farthest first).
- Add new lead button to create a new lead.

### Sales Agents Management

- Display all available sales agents with their name and email.
- Button to add new sales agent to the system.

### Reports

- Display pie-chart of leads closed last week.
- Display pie-chart of total leads in pipeline(closed and active).
- Display a bar-graph of total leads closed by each sales agent.
- Display a bar-graph of leads distribution by status.

### Leads by Status

- Display leads groups by their status.
- Filters to sort leads by sales agents and priority.
- Sorting options to sort leads by Time to Close(nearest first and fartest first).

### Leads by Agent

- Display leads groups by their asigned sales agent.
- Filters to sort leads by status and priority.
- Sorting options to sort leads by Time to Close(nearest first and fartest first).

## API Reference

### POST /api/agents

Create a new sales agent
Sample Response:

```
{ message, data: {name, email, _id, createdAt} }
```

### GET /api/agents

Get all sales agents
Sample Response:

```
{ data: [ {_id, name, email},.... ] }
```

### POST /api/leads

Create a new lead
Sample Response:

```
{ message, data: {_id, name, source, salesAgent, status, tags, timeToClose, priority, createdAt, updatedAt} }
```

### GET /api/leads

Lists all leads
Sample Response:

```
{ data: [ { _id, name, source, salesAgent:{ _id, name }, status, tags, timeToClose, priority, createdAt, updatedAt},.... ] }
```

### PUT /api/leads/:id

Update lead by id
Sample Response:

```
{ message, data: { _id, name, source, salesAgent:{ _id, name }, status, tags, timeToClose, priority } }
```

### POST /api/leads/:id/comments

Add a new comment
Sample Response:

```
{message, data: {_id, lead, author, commentText, createdAt}}
```

### GET /api/leads/:id/comments

Get all comments for a lead
Sample Response:

```
{ data: [ { _id, author: {name}, commentText, createdAt },.... ] }
```

### GET /api/report/last-week

Get leads that were closed last week
Sample Response:

```
{data: [ { _id, name, salesAgent: {name} },.... ]}
```

### GET /api/report/pipeline

Get total leads in pipeline
Sample Response:

```
{ totalLeadsInPipeline }
```

### GET /api/leads/:id

Get Lead by Id
Sample Response:

```
{ data: { _id, name, source, salesAgent: { _id, name }, status, tags, timeToClose, priority, createdAt, updatedAt } }
```

## Contact

For bugs or feature requests, please reach out to nihalukare959@gmail.com
