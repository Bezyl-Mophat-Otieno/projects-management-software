CREATE OR ALTER PROCEDURE updateProject (@project_id VARCHAR(200), @project_title VARCHAR(500), @project_description  VARCHAR(1000), @deadline DATE, @user_id VARCHAR(200))
AS
    BEGIN
        UPDATE projectsTable SET project_title= @project_title, project_description = @project_description, deadline = @deadline, user_id = @user_id WHERE project_id = @project_id
    END