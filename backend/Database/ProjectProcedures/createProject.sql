CREATE OR ALTER PROCEDURE createProjectPROC(@project_id VARCHAR(200), @project_title VARCHAR(500), @project_description VARCHAR(1000), @deadline DATE, @user_id VARCHAR(200))
AS
BEGIN
    INSERT INTO projectsTable(project_id, project_title, project_description, deadline, user_id) VALUES(@project_id, @project_title, @project_description, @deadline, @user_id)
END

SELECT * FROM projectsTable