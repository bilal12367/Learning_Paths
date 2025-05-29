
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker


engine = create_engine(url='mysql+pymysql://root:root@localhost:3306/test')


Base = declarative_base()
session = sessionmaker(bind=engine, autoflush=False)


def get_session():
    db = session()
    try:
        yield db
    finally:
        db.close()