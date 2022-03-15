from app.models import db, Answer

def seed_answers():
    answers = [
        Answer(user_id = 4, question_id = 1, answer = 'You can mostly just wear whatever you like, maybe wear some long sleeves and pants if you want to protect from scrapes.'),
        Answer(user_id = 2, question_id = 1, answer = 'It mostly depends on where you are climbing. You might want to consider bugs or other wildlife.'),
        Answer(user_id = 6, question_id = 1, answer = 'You can pretty much wear the same things you would wear when hiking or doing anything out in nature. Also, dont forget sunscreen!'),
        Answer(user_id = 4, question_id = 2, answer = 'For a beginner I would just get any climbing shoe that is relatively comfortable. You are probably at the level where your shoes dont make a huge difference. Once you start getting to a more advanced level you can start looking into different shoes for different purposes.'),
        Answer(user_id = 8, question_id = 2, answer = 'I think even for a beginner it is good to look into shoes that are good for what you want to do. Are you doing a lot of overhang climbing? Maybe a more agressive shoe is better. More slab climbing? Maybe a softer shoe is better.'),
        Answer(user_id = 2, question_id = 2, answer = 'Shoes are a personal choice. I personally go for comfort over most other things. If I cant stand to have my shoes on, is it even worth it?'),
        Answer(user_id = 2, question_id = 3, answer = 'Chalk is used to keep your hands dry. For those of us that have sweaty hands, it is a game changer.'),
        Answer(user_id = 2, question_id = 4, answer = 'At most commercial gyms, they color code their routes and problems. That means you need to follow a color for a problem or route to be the stated grade.'),
        Answer(user_id = 8, question_id = 4, answer = 'Problems and routes are color coded. That means when the route setters set problems, they grade it based on the assumption that you are following a color.'),
        Answer(user_id = 4, question_id = 5, answer = 'For bouldering there are two main grading scales, the V scale and the Font scale. The V scale currently goes from V0 to V17 and is the common grading system used in North America. The Font scale is similar to the V scale in that the higher the number the harder the problem, but every number also has an A, B, or C associated so a 6C is harder than a 6B which is harder than a 6C. The Font Scale is the predominant grading scale in Europe and parts of Asia.'),
        Answer(user_id = 2, question_id = 5, answer = 'I can mostly only talk about the V scale since I am located in the US. I think all the grading scales are open ended so there is no hardest grade. Climbers will continue to add on to the end of the scale as they are able to do harder and harder climbs. Currently there are 2 V17 boulders in the world, Burden of Dreams in Finland climbed by Nalle Hukkataival, and Return of the Sleepwalker by Daniel Woods.'),
        Answer(user_id = 8, question_id = 5, answer = 'Grading in bouldering is subjective since how hard something is, is very personal. Because of this, climbers use a grade by committee system. Anyone who climbs a problem can give their imput on what difficulty it is and after enough people climb it, it has a consensus grade. Of course the inital grade is given by the person with the first assent, but this gives way to future climbers potentially downgrading or upgrading climbs.'),
        Answer(user_id = 1, question_id = 7, answer = 'Bouldering is where you climb without a rope, but typically not much higher that 15 feet or so.'),
        Answer(user_id = 4, question_id = 7, answer = 'Bouldering is typically a short sequence of fairly intense moves. It can be vertical or you could even be traversing horrizontally. But you never have a rope when bouldering.'),
        Answer(user_id = 6, question_id = 8, answer = 'When top roping a rope is already set up through an anchor above you so if you ever fall it it relatively safe and you just hang on the rope. In lead climbing you are clipping your rope into safely equipment as you go so if you do fall you would fall down to your last piece of equipment.'),
        Answer(user_id = 4, question_id = 9, answer = 'I personally think that Yosemite is one of the best places in the world to climb, but really, there are a ton of amazing places all over the world to climb.'),
        Answer(user_id = 2, question_id = 9, answer = 'I second the vote for Yosemite.'),
        Answer(user_id = 6, question_id = 9, answer = 'Obviously I have not climbed everywhere, but I really love Bishop, CA for all the amazing bouldering they have.'),
        Answer(user_id = 5, question_id = 9, answer = 'You should really just checkout whatever local climbing spot you have. No way to know what you like without just going out there.'),
        Answer(user_id = 7, question_id = 10, answer = 'You know you can probably use the search feature and find the answer to that question.'),
        Answer(user_id = 9, question_id = 10, answer = 'I am also curious about the grading.'),
        Answer(user_id = 4, question_id = 10, answer = 'The US used the V scale for boulder grades and the YDS, Yosemite Decimal System, for route climbing.'),
        Answer(user_id = 4, question_id = 11, answer = 'Since we rely on friction to hold onto small holds, brushing holds removes chalk, dirt, and grime from the texture and increases our ability to hold holds.'),
        Answer(user_id = 2, question_id = 11, answer = 'You can really see the difference brushing makes in the gym. The texture of gym holds is often filled in with all kinds of crud so brushing it makes a big difference.'),
        Answer(user_id = 4, question_id = 12, answer = 'I think the best answer is just "It depends". Every person is different in what they are strong at and what they are weak at. Generally speaking, train your weaknesses to get the most benefit.'),
        Answer(user_id = 2, question_id = 12, answer = 'The main muscle groups used in climbing are your back/arms for pulling power, your core to hold tension, and your forearms for pure finger strength. For arms and back, pull-ups are probably your best bang for your buck. For core, there are a million different core exercises you can do, but I like hollow holds and hanging leg-raises. For finger strength, nothing beat hangboarding, but I wouldn not recommend hangboarding before until you have at least a year of experience. Your finger tendons take time to build up and you dont want to over do it.'),
        # Answer(user_id = , question_id = , answer = ''),
    ]

    for answer in answers:
        db.session.add(answer)

    db.session.commit()

def undo_answers():
    db.session.execute('TRUNCATE answers RESTART IDENTITY CASCADE;')
    db.session.commit()
