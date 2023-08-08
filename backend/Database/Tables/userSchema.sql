BEGIN 
TRY
    CREATE TABLE usersTable(
        user_id VARCHAR(200) PRIMARY KEY NOT NULL,
        email VARCHAR(200) NOT NULL,
        username VARCHAR(200) NOT NULL,
        password VARCHAR(200) NOT NULL,
        about VARCHAR(1000) NOT NULL,
        profile_pic VARCHAR(200) NOT NULL,
        role VARCHAR(20),
        isassigned BIT,
        project_id VARCHAR(200)
        FOREIGN KEY (project_id) REFERENCES projectsTable(project_id)
    )
END TRY
BEGIN CATCH
    THROW 50002, 'Table already exists', 1;
END CATCH

-- Adding the foreign key constraint
ALTER TABLE usersTable
ADD FOREIGN KEY (project_id)
REFERENCES projectsTable (project_id);