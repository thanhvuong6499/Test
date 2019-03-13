import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './the-loai-tieu-chi.reducer';
import { ITheLoaiTieuChi } from 'app/shared/model/the-loai-tieu-chi.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITheLoaiTieuChiDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class TheLoaiTieuChiDetail extends React.Component<ITheLoaiTieuChiDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { theLoaiTieuChiEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jhipsterApp.theLoaiTieuChi.detail.title">TheLoaiTieuChi</Translate> [<b>{theLoaiTieuChiEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="noiDung">
                <Translate contentKey="jhipsterApp.theLoaiTieuChi.noiDung">Noi Dung</Translate>
              </span>
            </dt>
            <dd>{theLoaiTieuChiEntity.noiDung}</dd>
            <dt>
              <span id="level">
                <Translate contentKey="jhipsterApp.theLoaiTieuChi.level">Level</Translate>
              </span>
            </dt>
            <dd>{theLoaiTieuChiEntity.level}</dd>
          </dl>
          <Button tag={Link} to="/entity/the-loai-tieu-chi" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/the-loai-tieu-chi/${theLoaiTieuChiEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ theLoaiTieuChi }: IRootState) => ({
  theLoaiTieuChiEntity: theLoaiTieuChi.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TheLoaiTieuChiDetail);
