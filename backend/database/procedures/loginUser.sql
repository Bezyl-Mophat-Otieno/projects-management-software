CREATE OR ALTER PROCEDURE getUserByEmail
    @email VARCHAR(255)
AS BEGIN
SELECT * FROM userTable WHERE email = @email
END;