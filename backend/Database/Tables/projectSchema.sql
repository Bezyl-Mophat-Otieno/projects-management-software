BEGIN 
TRY
    CREATE TABLE projectsTable(
        project_id VARCHAR(200) PRIMARY KEY NOT NULL,
        project_title VARCHAR(500) NOT NULL,
        project_description VARCHAR(1000) NOT NULL,
        deadline DATE NOT NULL,
        user_id VARCHAR(200),
        FOREIGN KEY (user_id) REFERENCES usersTable(user_id)
    )
END TRY
BEGIN CATCH
    THROW 50002, 'Table already exists', 1;
END CATCH



