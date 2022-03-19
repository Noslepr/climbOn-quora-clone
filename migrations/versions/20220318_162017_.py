"""empty message

Revision ID: 2a68a648072d
Revises: 9cefcb329744
Create Date: 2022-03-18 16:20:17.722951

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2a68a648072d'
down_revision = '9cefcb329744'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('profile_img', sa.String(length=1000), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'profile_img')
    # ### end Alembic commands ###