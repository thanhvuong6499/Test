import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './ban-danh-gia.reducer';
import { IBanDanhGia } from 'app/shared/model/ban-danh-gia.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBanDanhGiaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class BanDanhGiaDetail extends React.Component<IBanDanhGiaDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { banDanhGiaEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jhipsterApp.banDanhGia.detail.title">BanDanhGia</Translate> [<b>{banDanhGiaEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="moTa">
                <Translate contentKey="jhipsterApp.banDanhGia.moTa">Mo Ta</Translate>
              </span>
            </dt>
            <dd>{banDanhGiaEntity.moTa}</dd>
            <dt>
              <Translate contentKey="jhipsterApp.banDanhGia.giaovien">Giaovien</Translate>
            </dt>
            <dd>{banDanhGiaEntity.giaovien ? banDanhGiaEntity.giaovien.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/ban-danh-gia" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/ban-danh-gia/${banDanhGiaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ banDanhGia }: IRootState) => ({
  banDanhGiaEntity: banDanhGia.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BanDanhGiaDetail);
