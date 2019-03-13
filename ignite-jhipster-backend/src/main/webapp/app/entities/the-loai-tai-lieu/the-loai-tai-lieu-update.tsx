import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITaiLieu } from 'app/shared/model/tai-lieu.model';
import { getEntities as getTaiLieus } from 'app/entities/tai-lieu/tai-lieu.reducer';
import { getEntity, updateEntity, createEntity, reset } from './the-loai-tai-lieu.reducer';
import { ITheLoaiTaiLieu } from 'app/shared/model/the-loai-tai-lieu.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface ITheLoaiTaiLieuUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ITheLoaiTaiLieuUpdateState {
  isNew: boolean;
  tailieuId: number;
}

export class TheLoaiTaiLieuUpdate extends React.Component<ITheLoaiTaiLieuUpdateProps, ITheLoaiTaiLieuUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      tailieuId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getTaiLieus();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { theLoaiTaiLieuEntity } = this.props;
      const entity = {
        ...theLoaiTaiLieuEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/the-loai-tai-lieu');
  };

  render() {
    const isInvalid = false;
    const { theLoaiTaiLieuEntity, taiLieus, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhipsterApp.theLoaiTaiLieu.home.createOrEditLabel">
              <Translate contentKey="jhipsterApp.theLoaiTaiLieu.home.createOrEditLabel">Create or edit a TheLoaiTaiLieu</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : theLoaiTaiLieuEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="the-loai-tai-lieu-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="noiDungLabel" for="noiDung">
                    <Translate contentKey="jhipsterApp.theLoaiTaiLieu.noiDung">Noi Dung</Translate>
                  </Label>
                  <AvField id="the-loai-tai-lieu-noiDung" type="text" name="noiDung" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/the-loai-tai-lieu" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={isInvalid || updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  taiLieus: storeState.taiLieu.entities,
  theLoaiTaiLieuEntity: storeState.theLoaiTaiLieu.entity,
  loading: storeState.theLoaiTaiLieu.loading,
  updating: storeState.theLoaiTaiLieu.updating
});

const mapDispatchToProps = {
  getTaiLieus,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TheLoaiTaiLieuUpdate);
