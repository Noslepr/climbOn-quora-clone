from app.models import db, Question

def seed_questions():
    questions = [
        # Beginner questions
        Question(user_id = 1, question = 'What kind of clothes should I wear when I go outdoor rock climbing?'),
        Question(user_id = 3, question = 'What kind of shoes should I wear to a climbing gym?'),
        Question(user_id = 5, question = 'Why do I have to use chalk when I climb?'),
        Question(user_id = 7, question = 'What do the different colors mean when at an indoor climbing gym?'),
        Question(user_id = 9, question = 'How does the grading system work in bouldering?'),
        Question(user_id = 1, question = 'What type of shoes should I buy for outdoor climbing?'),
        Question(user_id = 3, question = 'What is bouldering in rock climbing?'),
        Question(user_id = 5, question = 'What is the difference between top roping and lead climbing?'),
        Question(user_id = 7, question = 'Where are the best places to climb outdoors?'),
        Question(user_id = 9, question = 'How does the grading system work in the US?'),
        Question(user_id = 1, question = 'What is the point of brushing holds?'),
        Question(user_id = 2, question = 'What should I do for training outside of just climbing?'),
        Question(user_id = 3, question = 'How do I begin trad climbing?'),
        Question(user_id = 5, question = 'What is the difference in equipment for ice climbing and trad climbing?'),
        Question(user_id = 1, question = 'What is trad climbing considered so expensive?'),
        Question(user_id = 1, question = 'What is a "trad dad"?'),
        Question(user_id = 7, question = 'How do I find the best climbing shoes?'),
        Question(user_id = 3, question = 'Where are the best Bay Area outdoor climbs for a beginner?'),
        Question(user_id = 9, question = 'Who are the best professional rock climbers?'),
        Question(user_id = 1, question = 'What is the best season to do outdoor climbing?'),
        Question(user_id = 1, question = 'What time of day is usually best to go climbing outdoors?'),



    ]

    for question in questions:
        db.session.add(question)

    db.session.commit()


def undo_questions():
    db.session.execute('TRUNCATE questions RESTART IDENTITY CASCADE;')
    db.session.commit()
