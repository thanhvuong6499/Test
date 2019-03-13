import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './van-ban.reducer';
import { IVanBan } from 'app/shared/model/van-ban.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVanBanDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class VanBanDetail extends React.Component<IVanBanDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { vanBanEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jhipsterApp.vanBan.detail.title">VanBan</Translate> [<b>{vanBanEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="tenVanban">
                <Translate contentKey="jhipsterApp.vanBan.tenVanban">Ten Vanban</Translate>
              </span>
            </dt>
            <dd>{vanBanEntity.tenVanban}</dd>
            <dt>
              <span id="tomTat">
                <Translate contentKey="jhipsterApp.vanBan.tomTat">Tom Tat</Translate>
              </span>
            </dt>
            <dd>{vanBanEntity.tomTat}</dd>
            <dt>
              <span id="uRL">
                <Translate contentKey="jhipsterApp.vanBan.uRL">U RL</Translate>
              </span>
            </dt>
            <dd>{vanBanEntity.uRL}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="jhipsterApp.vanBan.status">Status</Translate>
              </span>
            </dt>
            <dd>{vanBanEntity.status}</dd>
            <dt>
              <Translate contentKey="jhipsterApp.vanBan.coquanbanhanh">Coquanbanhanh</Translate>
            </dt>
            <dd>{vanBanEntity.coquanbanhanh ? vanBanEntity.coquanbanhanh.id : ''}</dd>
            <dt>
              <Translate contentKey="jhipsterApp.vanBan.theloaivanban">Theloaivanban</Translate>
            </dt>
            <dd>{vanBanEntity.theloaivanban ? vanBanEntity.theloaivanban.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/van-ban" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/van-ban/${vanBanEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ vanBan }: IRootState) => ({
  vanBanEntity: vanBan.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VanBanDetail);
