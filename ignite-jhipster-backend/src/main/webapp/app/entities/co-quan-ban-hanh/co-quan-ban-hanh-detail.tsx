import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './co-quan-ban-hanh.reducer';
import { ICoQuanBanHanh } from 'app/shared/model/co-quan-ban-hanh.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICoQuanBanHanhDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class CoQuanBanHanhDetail extends React.Component<ICoQuanBanHanhDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { coQuanBanHanhEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jhipsterApp.coQuanBanHanh.detail.title">CoQuanBanHanh</Translate> [<b>{coQuanBanHanhEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="tenCoQuan">
                <Translate contentKey="jhipsterApp.coQuanBanHanh.tenCoQuan">Ten Co Quan</Translate>
              </span>
            </dt>
            <dd>{coQuanBanHanhEntity.tenCoQuan}</dd>
          </dl>
          <Button tag={Link} to="/entity/co-quan-ban-hanh" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/co-quan-ban-hanh/${coQuanBanHanhEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ coQuanBanHanh }: IRootState) => ({
  coQuanBanHanhEntity: coQuanBanHanh.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CoQuanBanHanhDetail);
