CREATE OR ALTER PROCEDURE getOneProject (@project_id VARCHAR(200))
AS  
    BEGIN 
        SELECT * FROM projectsTable WHERE project_id = @project_id
    END