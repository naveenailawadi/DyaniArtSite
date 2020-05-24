from datetime import datetime
from flaskapp import db


class LeadModel(db.Model):
    __tablename__ = 'leads'
    id = db.Column(db.Integer, primary_key=True)

    # contact information
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    phone_number = db.Column(db.String(50), nullable=True)

    # message stuff
    subject = db.Column(db.String(100), nullable=True)
    message = db.Column(db.String(5000), nullable=False)

    # additional platforms --> store as dict
    additional_platforms = db.Column(db.String(400), nullable=True)

    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"Lead('{self.name}', '{self.date_posted}')"
