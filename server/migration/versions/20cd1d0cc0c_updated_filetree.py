"""Updated filetree

Revision ID: 20cd1d0cc0c
Revises: 26b88e19ee9
Create Date: 2015-08-16 13:35:35.455954

"""

# revision identifiers, used by Alembic.
revision = '20cd1d0cc0c'
down_revision = '26b88e19ee9'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tree',
    sa.Column('created_on', sa.DateTime(), nullable=True),
    sa.Column('updated_on', sa.DateTime(), nullable=True),
    sa.Column('rel_path', sa.Unicode(length=1024), nullable=True),
    sa.Column('parent', sa.Unicode(length=1024), nullable=True),
    sa.Column('id', sa.Unicode(length=1024), nullable=False),
    sa.Column('size', sa.Float(), nullable=True),
    sa.Column('text', sa.Unicode(length=1024), nullable=True),
    sa.Column('type', sa.Unicode(length=1024), nullable=True),
    sa.Column('icon', sa.Unicode(length=1024), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('file', sa.Column('server', sa.VARCHAR(length=1024), nullable=True))
    op.drop_table('tree')
    ### end Alembic commands ###