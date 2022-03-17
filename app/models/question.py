from .db import db

class Question(db.Model):
    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    question = db.Column(db.String(1000), nullable=False)

    user = db.relationship('User', back_populates='questions')
    answers = db.relationship('Answer', back_populates='question', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user.to_dict(),
            'question': self.question,
            'answers': [answer.to_dict() for answer in self.answers]
        }
