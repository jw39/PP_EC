import pymysql

# def db_connection():
#     db = pymysql.connect(
#         host='project-db-cgi.smhrd.com',
#         port=3307,
#         user='personal_pick',
#         password='1234',
#         db='personal_pick',
#         charset='utf8mb4'
#     )
    
#     return db

def db_connection():
    db = pymysql.connect(
        host='192.168.1.23',
        port=3306,
        user='ppuser',
        password='12345',
        db='personal_ec',
        charset='utf8mb4'
    )
    
    return db
