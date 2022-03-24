from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    users = [
        User(
            full_name='Hrodebert Elder',
            email='Hrodeber@Elder.com',
            password='password!',
            credentials='Beginner climber 6mo experience',
            profile_img='https://climb-on.s3.amazonaws.com/4cb5b16aeff344299bfe52be624143dc.jpg'),
        User(
            full_name='Ortwin Amatore',
            email='ortwin@amatore.com',
            password='password!',
            credentials='Intermediate climber 3yrs experience'),
        User(
            full_name='Anil Warrick',
            email='Anil@Warrick.com',
            password='password!',
            credentials='New climber',
            profile_img='https://climb-on.s3.amazonaws.com/4cb5b16aeff344299bfe52be624143dc.jpg'),
        User(
            full_name='Watson Soriano',
            email='watson@soriano.com',
            password='password!',
            credentials='Professional climber 15yrs Bouldering specialist'),
        User(
            full_name='Nadab Severins',
            email='Nadab@Severins.com',
            password='password!',
            credentials='v0 gumby',
            profile_img='https://climb-on.s3.amazonaws.com/d3fc26ae94414a4e901bec3f7b229696.png'),
        User(
            full_name='Neilos Thornton',
            email='Neilos@Thornton.com',
            password='password!',
            credentials='Intermediate climber V6 boulderer'),
        User(
            full_name='Severina Georgiev',
            email='Severina@Georgiev.com',
            password='password!',
            credentials='Beginner climber',
            profile_img='https://climb-on.s3.amazonaws.com/61b89a74cdb54a21af91ed17e1844a19.jpg'),
        User(
            full_name='Pipin Oliversen',
            email='Pipin@Oliversen.com',
            password='password!',
            credentials='5.12a redpoint outdoor'),
        User(
            full_name='Flaka Meeuwes',
            email='Flaka@Meeuwes.com',
            password='password!',
            credentials='Just starting out',
            profile_img='https://climb-on.s3.amazonaws.com/cf83d1ade26341a5844dbd0150d12f7f.jpeg'),
    ]

    for user in users:
        db.session.add(user)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
