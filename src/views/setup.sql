-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

-- ========================================
-- Service Projects Table
-- ========================================
CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150),
    start_date DATE NOT NULL,
    end_date DATE,
    status VARCHAR(30) NOT NULL DEFAULT 'Planned',

    CONSTRAINT fk_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id),

    CONSTRAINT chk_project_status
        CHECK (status IN ('Planned', 'Active', 'Completed')),

    CONSTRAINT chk_project_dates
        CHECK (end_date IS NULL OR end_date >= start_date)
);

-- ========================================
-- Insert sample data: Service Projects
-- ========================================
INSERT INTO service_project
    (organization_id, name, description, location, start_date, end_date, status)
VALUES

-- Organization 1: BrightFuture Builders
(1,
 'Community Center Renovation',
 'Renovate an aging community center to improve accessibility and create additional activity spaces.',
 'Downtown Community District',
 '2026-09-15',
 '2026-11-30',
 'Planned'),

(1,
 'Neighborhood Playground Build',
 'Construct a safe and sustainable playground for children in an underserved neighborhood.',
 'Oakwood Neighborhood',
 '2026-08-01',
 '2026-09-20',
 'Active'),

(1,
 'Affordable Housing Repair Day',
 'Repair roofs, doors, and basic infrastructure for families living in older homes.',
 'Riverside Community',
 '2026-07-10',
 '2026-07-12',
 'Completed'),

(1,
 'Solar Lighting Installation',
 'Install solar-powered outdoor lighting around public walkways and gathering areas.',
 'Central Park District',
 '2026-10-05',
 '2026-10-25',
 'Planned'),

(1,
 'School Accessibility Upgrade',
 'Build ramps and improve accessibility features at a local elementary school.',
 'Lincoln Elementary School',
 '2026-08-20',
 '2026-10-15',
 'Active'),

-- Organization 2: GreenHarvest Growers
(2,
 'Community Garden Expansion',
 'Expand an existing community garden by adding additional planting beds and irrigation.',
 'Northside Community Garden',
 '2026-09-01',
 '2026-10-10',
 'Active'),

(2,
 'Urban Farming Workshop',
 'Teach residents how to grow vegetables and herbs in small urban spaces.',
 'GreenHarvest Learning Center',
 '2026-09-25',
 '2026-09-25',
 'Planned'),

(2,
 'School Garden Project',
 'Create a vegetable garden where students can learn about agriculture and nutrition.',
 'Jefferson Middle School',
 '2026-08-10',
 '2026-09-05',
 'Completed'),

(2,
 'Neighborhood Compost Program',
 'Provide compost bins and education to reduce household food waste.',
 'Westside Neighborhood',
 '2026-10-01',
 NULL,
 'Planned'),

(2,
 'Fresh Produce Distribution',
 'Harvest and distribute fresh vegetables to families experiencing food insecurity.',
 'Eastside Community Center',
 '2026-09-05',
 '2026-12-15',
 'Active'),

-- Organization 3: UnityServe Volunteers
(3,
 'Food Bank Volunteer Day',
 'Coordinate volunteers to sort and package food donations for local families.',
 'City Food Bank',
 '2026-09-12',
 '2026-09-12',
 'Planned'),

(3,
 'Park Cleanup Initiative',
 'Organize volunteers to remove litter and improve public recreation areas.',
 'Riverfront Park',
 '2026-08-15',
 '2026-08-15',
 'Completed'),

(3,
 'Senior Assistance Program',
 'Connect volunteers with senior citizens who need help with household tasks and errands.',
 'Various Neighborhoods',
 '2026-09-01',
 '2026-12-20',
 'Active'),

(3,
 'Charity Clothing Drive',
 'Collect, organize, and distribute donated clothing to local shelters.',
 'UnityServe Volunteer Center',
 '2026-10-10',
 '2026-10-20',
 'Planned'),

(3,
 'Youth Mentoring Day',
 'Recruit volunteers to provide mentoring and educational activities for local youth.',
 'Community Youth Center',
 '2026-09-20',
 '2026-09-20',
 'Planned');