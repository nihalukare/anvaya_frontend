# Anvaya

Anvaya is a CRM app that helps sales teams manage leads with ease. Users can add and view leads, collaborate through comments, track progress, and access reports with valuable insights.

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

Watch a walkthrough of all major features of this application - [Video](https://drive.google.com/file/d/1AOiXlPmken43mc3PqLEz-BJ3uK3pE94r/view?usp=sharing)

## Features

### Dashboard

- Paginated list of all leads.
- Overview of leads distribution by status.
- Quick filters to view leads by status.
- Add New Lead button to create a new lead.

### LeadList

- Paginated list of all leads with detailed view.
- Filters to refine leads by status, sales agent, source, and tags.
- Sorting options by priority (High, Medium, Low) and time to close (nearest first, farthest first).
- Add New Lead button for quick new lead creation.

### Sales Agents Management

- Displays all sales agents with name and email.
- Option to add new sales agents to the system.

### Reports

- Pie chart of leads closed last week.
- Pie chart of total leads in pipeline (closed and active).
- Bar graph of leads closed by each sales agent.
- Bar graph of leads distribution by status.

### Leads by Status

- Leads grouped by their current status.
- Filters to refine leads by sales agent and priority.
- Sorting options by time to close (nearest first, farthest first).

### Leads by Agent

- Leads grouped by assigned sales agent.
- Filters to refine leads by status and priority.
- Sorting options by time to close (nearest first, farthest first).

## API Reference

### POST /api/agents

Create a new sales agent<br />
Sample Response:

```
{ message, data: {name, email, _id, createdAt} }
```

### GET /api/agents

Get all sales agents<br />
Sample Response:

```
{ data: [ {_id, name, email},.... ] }
```

### POST /api/leads

Create a new lead<br />
Sample Response:

```
{ message, data: {_id, name, source, salesAgent, status, tags, timeToClose, priority, createdAt, updatedAt} }
```

### GET /api/leads

Lists all leads<br />
Sample Response:

```
{ data: [ { _id, name, source, salesAgent:{ _id, name }, status, tags, timeToClose, priority, createdAt, updatedAt},.... ] }
```

### PUT /api/leads/:id

Update lead by id<br />
Sample Response:

```
{ message, data: { _id, name, source, salesAgent:{ _id, name }, status, tags, timeToClose, priority } }
```

### POST /api/leads/:id/comments

Add a new comment<br />
Sample Response:

```
{message, data: {_id, lead, author, commentText, createdAt}}
```

### GET /api/leads/:id/comments

Get all comments for a lead<br />
Sample Response:

```
{ data: [ { _id, author: {name}, commentText, createdAt },.... ] }
```

### GET /api/report/last-week

Get leads that were closed last week<br />
Sample Response:

```
{data: [ { _id, name, salesAgent: {name} },.... ]}
```

### GET /api/report/pipeline

Get total leads in pipeline<br />
Sample Response:

```
{ totalLeadsInPipeline }
```

### GET /api/leads/:id

Get Lead by Id<br />
Sample Response:

```
{ data: { _id, name, source, salesAgent: { _id, name }, status, tags, timeToClose, priority, createdAt, updatedAt } }
```

## Contact

For bugs or feature requests, please reach out to nihalukare959@gmail.com
