import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './tieu-chi-danh-gia.reducer';
import { ITieuChiDanhGia } from 'app/shared/model/tieu-chi-danh-gia.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITieuChiDanhGiaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class TieuChiDanhGiaDetail extends React.Component<ITieuChiDanhGiaDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { tieuChiDanhGiaEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jhipsterApp.tieuChiDanhGia.detail.title">TieuChiDanhGia</Translate> [<b>{tieuChiDanhGiaEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="noiDung">
                <Translate contentKey="jhipsterApp.tieuChiDanhGia.noiDung">Noi Dung</Translate>
              </span>
            </dt>
            <dd>{tieuChiDanhGiaEntity.noiDung}</dd>
            <dt>
              <span id="level">
                <Translate contentKey="jhipsterApp.tieuChiDanhGia.level">Level</Translate>
              </span>
            </dt>
            <dd>{tieuChiDanhGiaEntity.level}</dd>
            <dt>
              <Translate contentKey="jhipsterApp.tieuChiDanhGia.theloaitieuchi">Theloaitieuchi</Translate>
            </dt>
            <dd>{tieuChiDanhGiaEntity.theloaitieuchi ? tieuChiDanhGiaEntity.theloaitieuchi.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/tieu-chi-danh-gia" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/tieu-chi-danh-gia/${tieuChiDanhGiaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ tieuChiDanhGia }: IRootState) => ({
  tieuChiDanhGiaEntity: tieuChiDanhGia.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TieuChiDanhGiaDetail);
