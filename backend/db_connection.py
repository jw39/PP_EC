import pymysql

def db_connection():
    db = pymysql.connect(
        host='project-db-cgi.smhrd.com',
        port=3307,
        user='personal_pick',
        password='1234',
        db='personal_pick',
        charset='utf8mb4'
    )
    
    return db
