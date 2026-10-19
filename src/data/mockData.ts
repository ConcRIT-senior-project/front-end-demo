export const SAMPLES = [
  { id: 'D1557', client: 'Harmon Farms', type: 'ASTM D1557', received: 'Sep 23', due: 'Sep 25', status: 'In Progress', priority: 'Rush' },
  { id: 'D2216', client: 'Verde Organics', type: 'ASTM D2216', received: 'Sep 23', due: 'Sep 27', status: 'Overdue', priority: 'Standard' },
  { id: 'D422 w Hyd', client: 'BlueSky Agriculture', type: 'ASTM D422', received: 'Sep 22', due: 'Sep 26', status: 'Awaiting Review', priority: 'Standard' },
  { id: 'D422 wo Hyd', client: 'Meridian Growers', type: 'ASTM D422', received: 'Sep 22', due: 'Sep 24', status: 'Complete', priority: 'Rush' },
  { id: 'D4318', client: 'Elm Creek Co-op', type: 'ASTM D4318', received: 'Sep 21', due: 'Sep 25', status: 'Complete', priority: 'Standard' },
  { id: 'D2216 & Hyd', client: 'Prairie Root LLC', type: 'ASTM D1498', received: 'Sep 21', due: 'Sep 28', status: 'In Progress', priority: 'Standard' },
  { id: 'D2216 no Hyd', client: 'Harmon Farms', type: 'ASTM D1172', received: 'Sep 20', due: 'Sep 24', status: 'Overdue', priority: 'Rush' },
  { id: 'D698', client: 'North Ridge Farms', type: 'ASTM D698', received: 'Sep 20', due: 'Sep 23', status: 'Overdue', priority: 'Rush' },
  { id: 'D2487', client: 'Stonebrook Materials', type: 'ASTM D2487', received: 'Sep 24', due: 'Sep 29', status: 'In Progress', priority: 'Standard' },
  { id: 'D854', client: 'Cedar Valley Co-op', type: 'ASTM D854', received: 'Sep 24', due: 'Sep 27', status: 'Awaiting Review', priority: 'Standard' },
  { id: 'D1140', client: 'Summit Earthworks', type: 'ASTM D1140', received: 'Sep 19', due: 'Sep 24', status: 'Complete', priority: 'Standard' },
  { id: 'D2166', client: 'Redwood Geotechnical', type: 'ASTM D2166', received: 'Sep 18', due: 'Sep 22', status: 'Overdue', priority: 'Standard' },
  { id: 'D2435', client: 'Clearwater Engineering', type: 'ASTM D2435', received: 'Sep 23', due: 'Sep 30', status: 'In Progress', priority: 'Standard' },
  { id: 'D3080', client: 'Highland Infrastructure', type: 'ASTM D3080', received: 'Sep 22', due: 'Sep 28', status: 'Awaiting Review', priority: 'Rush' },
  { id: 'D4767', client: 'Oakline Development', type: 'ASTM D4767', received: 'Sep 17', due: 'Sep 23', status: 'Complete', priority: 'Standard' },
  { id: 'D6913', client: 'Greenfield Civil', type: 'ASTM D6913', received: 'Sep 25', due: 'Oct 1', status: 'In Progress', priority: 'Rush' },
  { id: 'D7928', client: 'West Basin Labs', type: 'ASTM D7928', received: 'Sep 21', due: 'Sep 26', status: 'Awaiting Review', priority: 'Standard' },
]

export const WORKFLOW_TESTS = [
  { sample: 'D1557', test: 'ASTM D1557', analyst: 'Dr. Chen', started: '08:30', est: '09:00', status: 'Running' },
  { sample: 'D1557', test: 'ASTM D1557', analyst: 'M. Torres', started: '09:15', est: '11:00', status: 'Running' },
  { sample: 'D2216 & Hyd', test: 'ASTM D1498', analyst: 'M. Torres', started: '10:00', est: '12:30', status: 'Running' },
  { sample: 'D2216', test: 'ASTM D2216', analyst: 'K. Park', started: '—', est: '14:00', status: 'Queued' },
  { sample: 'D2216', test: 'ASTM D2216', analyst: 'Dr. Chen', started: '—', est: '15:30', status: 'Queued' },
  { sample: 'D2216 no Hyd', test: 'ASTM D1172', analyst: 'J. Osei', started: '—', est: 'Sep 25', status: 'Queued' },
  { sample: 'D422 w Hyd', test: 'ASTM D422', analyst: 'K. Park', started: '—', est: 'Awaiting review', status: 'Hold' },
]

export const RESULTS = [
  { id: 'D422 wo Hyd', client: 'Meridian Growers', type: 'ASTM D422', completed: 'Sep 23', analyst: 'J. Osei', flag: false },
  { id: 'D4318', client: 'Elm Creek Co-op', type: 'ASTM D4318', completed: 'Sep 22', analyst: 'Dr. Chen', flag: true },
  { id: 'D2216', client: 'Verde Organics', type: 'ASTM D2216', completed: 'Sep 19', analyst: 'M. Torres', flag: false },
  { id: 'D422 w Hyd', client: 'BlueSky Agriculture', type: 'ASTM D422', completed: 'Sep 18', analyst: 'K. Park', flag: true },
  { id: 'D2216 & Hyd', client: 'Prairie Root LLC', type: 'ASTM D1498', completed: 'Sep 16', analyst: 'Dr. Chen', flag: false },
]

export const CLIENTS = [
  { name: 'Harmon Farms', contact: 'Dale Harmon', email: 'dale@harmonfarns.com', samples: 28, active: 3, since: '2019' },
  { name: 'Verde Organics', contact: 'Sofia Reyes', email: 'sofia@verde.org', samples: 14, active: 1, since: '2021' },
  { name: 'BlueSky Agriculture', contact: 'Tom Whitfield', email: 'tom@bluesky.ag', samples: 42, active: 1, since: '2017' },
  { name: 'Meridian Growers', contact: 'Asha Patel', email: 'asha@meridian.co', samples: 9, active: 0, since: '2023' },
  { name: 'Elm Creek Co-op', contact: 'Frank Bauer', email: 'fbauer@elmcreek.coop', samples: 31, active: 0, since: '2018' },
  { name: 'Prairie Root LLC', contact: 'Nadia Johansson', email: 'nadia@prairieroot.com', samples: 17, active: 1, since: '2022' },
]

export const PROJECTS = [
  { name: 'North Field Expansion', client: 'Harmon Farms', start: 'Sep 18', due: 'Sep 30', assignee: 'M. Torres', status: 'In Progress' },
  { name: 'Orchard Drainage Study', client: 'Verde Organics', start: 'Sep 12', due: 'Sep 24', assignee: 'Dr. Chen', status: 'Overdue' },
  { name: 'Foundation Assessment', client: 'BlueSky Agriculture', start: 'Sep 20', due: 'Oct 4', assignee: 'K. Park', status: 'In Progress' },
  { name: 'West Parcel Survey', client: 'Meridian Growers', start: 'Sep 8', due: 'Sep 22', assignee: 'J. Osei', status: 'Complete' },
  { name: 'Storage Pad Design', client: 'Elm Creek Co-op', start: 'Sep 16', due: 'Sep 27', assignee: 'K. Park', status: 'Awaiting Review' },
  { name: 'Greenhouse Site Review', client: 'Prairie Root LLC', start: 'Sep 22', due: 'Oct 6', assignee: 'M. Torres', status: 'In Progress' },
]

export const ADMIN_USERS = [
  { name: 'Dir. Craig', initials: 'DC', role: 'Quality Director', access: 'Administrator', status: 'Active' },
  { name: 'M. Torres', initials: 'MT', role: 'Lab Analyst', access: 'Lab Tech', status: 'Active' },
  { name: 'K. Park', initials: 'KP', role: 'Lab Analyst', access: 'Lab Tech', status: 'Active' },
  { name: 'J. Osei', initials: 'JO', role: 'Lab Analyst', access: 'Lab Tech', status: 'Active' },
]