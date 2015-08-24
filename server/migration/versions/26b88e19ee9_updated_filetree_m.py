"""Updated filetree m

Revision ID: 26b88e19ee9
Revises: 61ed55c59d
Create Date: 2015-08-16 13:34:13.616322

"""

# revision identifiers, used by Alembic.
revision = '26b88e19ee9'
down_revision = '61ed55c59d'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tree')
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tree', sa.Column('path', sa.VARCHAR(length=1024), nullable=True))
    op.add_column('tree', sa.Column('children', sa.VARCHAR(length=1024), nullable=True))
    op.add_column('file', sa.Column('server', sa.VARCHAR(length=1024), nullable=True))
    ### end Alembic commands ###