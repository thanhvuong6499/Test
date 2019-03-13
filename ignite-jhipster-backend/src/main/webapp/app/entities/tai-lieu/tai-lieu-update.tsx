import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITheLoaiTaiLieu } from 'app/shared/model/the-loai-tai-lieu.model';
import { getEntities as getTheLoaiTaiLieus } from 'app/entities/the-loai-tai-lieu/the-loai-tai-lieu.reducer';
import { IGiaoVien } from 'app/shared/model/giao-vien.model';
import { getEntities as getGiaoViens } from 'app/entities/giao-vien/giao-vien.reducer';
import { getEntity, updateEntity, createEntity, reset } from './tai-lieu.reducer';
import { ITaiLieu } from 'app/shared/model/tai-lieu.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface ITaiLieuUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface ITaiLieuUpdateState {
  isNew: boolean;
  idstheloaitailieu: any[];
  giaovienId: number;
}

export class TaiLieuUpdate extends React.Component<ITaiLieuUpdateProps, ITaiLieuUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idstheloaitailieu: [],
      giaovienId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getTheLoaiTaiLieus();
    this.props.getGiaoViens();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { taiLieuEntity } = this.props;
      const entity = {
        ...taiLieuEntity,
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
    this.props.history.push('/entity/tai-lieu');
  };

  theloaitailieuUpdate = element => {
    const selected = Array.from(element.target.selectedOptions).map((e: any) => e.value);
    this.setState({
      idstheloaitailieu: keysToValues(selected, this.props.theLoaiTaiLieus, 'id')
    });
  };

  displaytheloaitailieu(value: any) {
    if (this.state.idstheloaitailieu && this.state.idstheloaitailieu.length !== 0) {
      const list = [];
      for (const i in this.state.idstheloaitailieu) {
        if (this.state.idstheloaitailieu[i]) {
          list.push(this.state.idstheloaitailieu[i].id);
        }
      }
      return list;
    }
    if (value.theloaitailieus && value.theloaitailieus.length !== 0) {
      const list = [];
      for (const i in value.theloaitailieus) {
        if (value.theloaitailieus[i]) {
          list.push(value.theloaitailieus[i].id);
        }
      }
      this.setState({
        idstheloaitailieu: keysToValues(list, this.props.theLoaiTaiLieus, 'id')
      });
      return list;
    }
    return null;
  }

  render() {
    const isInvalid = false;
    const { taiLieuEntity, theLoaiTaiLieus, giaoViens, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jhipsterApp.taiLieu.home.createOrEditLabel">
              <Translate contentKey="jhipsterApp.taiLieu.home.createOrEditLabel">Create or edit a TaiLieu</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : taiLieuEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="tai-lieu-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="tenVanBanLabel" for="tenVanBan">
                    <Translate contentKey="jhipsterApp.taiLieu.tenVanBan">Ten Van Ban</Translate>
                  </Label>
                  <AvField id="tai-lieu-tenVanBan" type="text" name="tenVanBan" />
                </AvGroup>
                <AvGroup>
                  <Label id="tomTatLabel" for="tomTat">
                    <Translate contentKey="jhipsterApp.taiLieu.tomTat">Tom Tat</Translate>
                  </Label>
                  <AvField id="tai-lieu-tomTat" type="text" name="tomTat" />
                </AvGroup>
                <AvGroup>
                  <Label id="uRLLabel" for="uRL">
                    <Translate contentKey="jhipsterApp.taiLieu.uRL">U RL</Translate>
                  </Label>
                  <AvField id="tai-lieu-uRL" type="text" name="uRL" />
                </AvGroup>
                <AvGroup>
                  <Label id="dungLuongLabel" for="dungLuong">
                    <Translate contentKey="jhipsterApp.taiLieu.dungLuong">Dung Luong</Translate>
                  </Label>
                  <AvField id="tai-lieu-dungLuong" type="number" className="form-control" name="dungLuong" />
                </AvGroup>
                <AvGroup>
                  <Label id="tagLabel" for="tag">
                    <Translate contentKey="jhipsterApp.taiLieu.tag">Tag</Translate>
                  </Label>
                  <AvField id="tai-lieu-tag" type="text" name="tag" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel">
                    <Translate contentKey="jhipsterApp.taiLieu.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="tai-lieu-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && taiLieuEntity.status) || 'TONTAI'}
                  >
                    <option value="TONTAI">TONTAI</option>
                    <option value="DAXOA">DAXOA</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="theLoaiTaiLieus">
                    <Translate contentKey="jhipsterApp.taiLieu.theloaitailieu">Theloaitailieu</Translate>
                  </Label>
                  <AvInput
                    id="tai-lieu-theloaitailieu"
                    type="select"
                    multiple
                    className="form-control"
                    name="faketheLoaiTaiLieus"
                    value={this.displaytheloaitailieu(taiLieuEntity)}
                    onChange={this.theloaitailieuUpdate}
                  >
                    <option value="" key="0" />
                    {theLoaiTaiLieus
                      ? theLoaiTaiLieus.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput id="tai-lieu-theloaitailieu" type="hidden" name="theloaitailieus" value={this.state.idstheloaitailieu} />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/tai-lieu" replace color="info">
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
  theLoaiTaiLieus: storeState.theLoaiTaiLieu.entities,
  giaoViens: storeState.giaoVien.entities,
  taiLieuEntity: storeState.taiLieu.entity,
  loading: storeState.taiLieu.loading,
  updating: storeState.taiLieu.updating
});

const mapDispatchToProps = {
  getTheLoaiTaiLieus,
  getGiaoViens,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TaiLieuUpdate);
