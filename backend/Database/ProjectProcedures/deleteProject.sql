CREATE OR ALTER PROCEDURE deleteProject (@project_id VARCHAR(200)) 
AS
BEGIN
    DELETE FROM projectsTable WHERE project_id = @project_id
END