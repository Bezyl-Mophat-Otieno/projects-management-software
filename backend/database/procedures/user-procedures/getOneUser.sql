

CREATE OR ALTER PROCEDURE getOneUser
    @id VARCHAR(255)
AS BEGIN
SELECT * FROM userTable WHERE id = @id
END;