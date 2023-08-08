CREATE OR ALTER PROCEDURE createUser(@user_id VARCHAR(200), @email VARCHAR(200), @username VARCHAR(200), @password VARCHAR(200), @about VARCHAR(1000), @profile_pic VARCHAR(200), @role VARCHAR(20), @isassigned BIT, @project_id VARCHAR(200))
AS
BEGIN
    INSERT INTO usersTable(user_id, email, username, password, about, profile_pic, role, isassigned, project_id) VALUES(@user_id, $email, @username, @password, @about, @profile_pic, @role, @isassigned, @project_id )
END