import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './the-loai-tai-lieu.reducer';
import { ITheLoaiTaiLieu } from 'app/shared/model/the-loai-tai-lieu.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITheLoaiTaiLieuDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class TheLoaiTaiLieuDetail extends React.Component<ITheLoaiTaiLieuDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { theLoaiTaiLieuEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jhipsterApp.theLoaiTaiLieu.detail.title">TheLoaiTaiLieu</Translate> [<b>{theLoaiTaiLieuEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="noiDung">
                <Translate contentKey="jhipsterApp.theLoaiTaiLieu.noiDung">Noi Dung</Translate>
              </span>
            </dt>
            <dd>{theLoaiTaiLieuEntity.noiDung}</dd>
          </dl>
          <Button tag={Link} to="/entity/the-loai-tai-lieu" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/the-loai-tai-lieu/${theLoaiTaiLieuEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ theLoaiTaiLieu }: IRootState) => ({
  theLoaiTaiLieuEntity: theLoaiTaiLieu.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TheLoaiTaiLieuDetail);
